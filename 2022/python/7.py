from __future__ import annotations
from dataclasses import dataclass
from typing import Dict, List, Union


@dataclass
class File:
    name: str
    size: int


class Folder:
    name: str
    children: List[Union[Folder, File]]
    parent: Folder | None

    def __init__(self, name, children, parent):
        self.name = name
        self.children = children
        self.parent = parent


class Filesystem:
    root: Folder
    cwd: Folder

    def __init__(self, root: Folder):
        self.root = root
        self.cwd = root

    def cd(self, directory: str):
        if directory == "/":
            self.cwd = self.root
        elif directory == "..":
            self.cwd = self.cwd.parent
        else:
            self.cwd = next((x for x in self.cwd.children if isinstance(x, Folder) and x.name == directory), None)

    def add_folder(self, folder: Folder):
        self.cwd.children.append(folder)

    def add_file(self, file: File):
        self.cwd.children.append(file)

    @staticmethod
    def subfiles(f: Folder) -> List[File]:
        files = []
        for c in f.children:
            if isinstance(c, Folder):
                files = files + Filesystem.subfiles(c)
            elif isinstance(c, File):
                files = files + [c]
        return files

    @staticmethod
    def subfolders(f: Folder) -> List[Folder]:
        def _subfolders(f: Folder):
            folders = []
            for c in f.children:
                if isinstance(c, Folder):
                    folders = folders + [c] + _subfolders(c)
            return folders
        return [f] + _subfolders(f)


def build_filesystem(f: str) -> Filesystem:
    root = Folder("/", [], None)
    fs = Filesystem(root)
    with open(f) as f:
        while True:
            next_line = f.readline()
            if not next_line:
                break
            match next_line.rstrip().split(" "):
                case ["$", "cd", cd_to]:
                    fs.cd(cd_to)
                case ["$", "ls"]:
                    while True:
                        next_line = f.readline()
                        if not next_line:
                            break
                        if next_line.rstrip().startswith("$"):
                            f.seek(f.tell() - len(next_line), 0)
                            break
                        match next_line.rstrip().split(" "):
                            case ["dir", dir_name]:
                                fs.add_folder(Folder(dir_name, [], fs.cwd))
                            case [size, file_name]:
                                fs.add_file(File(file_name, int(size)))
    return fs


def solve() -> int:
    fs = build_filesystem("7.in")
    folder_sizes = []
    for folder in Filesystem.subfolders(fs.root):
        folder_sizes.append(sum([file.size for file in Filesystem.subfiles(folder)]))
    total = 0
    for size in folder_sizes:
        if size <= 100000:
            total = total + size
    return total


def solve_b() -> int:
    fs = build_filesystem("7.in")
    folder_sizes = []
    for folder in Filesystem.subfolders(fs.root):
        size = sum([file.size for file in Filesystem.subfiles(folder)])
        folder_sizes.append((folder, size))
    folder_sizes.sort(key=lambda f: f[1])
    root_size = folder_sizes.pop()
    required_space = 70000000 - root_size[1]
    min_delete_size = 30000000 - required_space
    for (f, size) in folder_sizes:
        if size >= min_delete_size:
            print(size)
            break


print(solve_b())
