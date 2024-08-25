import os
import re
from docx import Document

def is_chinese_comment(line):
    # 检查是否包含中文注释
    return re.search(r'//.*[\u4e00-\u9fa5]', line) is not None

def process_file(file_path, doc):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        for line in lines:
            if not is_chinese_comment(line):
                doc.add_paragraph(line)

def main(folder_path, output_word_path):
    doc = Document()
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.js'):
                file_path = os.path.join(root, file)
                process_file(file_path, doc)
    doc.save(output_word_path)

if __name__ == "__main__":
    folder_path = './src'  # 替换为你的文件夹路径
    output_word_path = 'output.docx'  # 替换为你想要的输出 Word 文档路径
    main(folder_path, output_word_path)
