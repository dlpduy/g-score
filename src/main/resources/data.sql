DROP DATABASE IF EXISTS DiemthiTHPT;

CREATE DATABASE IF NOT EXISTS DiemthiTHPT;

USE DiemthiTHPT;


CREATE TABLE students (
    id VARCHAR(10) PRIMARY KEY
);

CREATE TABLE subjects (
    name VARCHAR(20) PRIMARY KEY
);

CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    point DOUBLE NOT NULL,
    student_id VARCHAR(10),
	subject_name VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_name) REFERENCES subjects(name)
);
-- Bảng students: Đã có chỉ mục duy nhất cho registration_number
CREATE UNIQUE INDEX idx_id ON students(id);

-- Bảng subjects: Tạo chỉ mục cho tên môn học
CREATE INDEX idx_subject_name ON subjects(name);

-- Bảng scores: Tạo chỉ mục cho student_id và subject_name
CREATE INDEX idx_student_id ON scores(student_id);
CREATE INDEX idx_subject_name ON scores(subject_name);

-- Bảng scores: Tạo chỉ mục kết hợp cho student_id và subject_name
CREATE INDEX idx_student_subject ON scores(student_id, subject_name);

-- Bảng scores: Tạo chỉ mục kết hợp cho student_id và point
CREATE INDEX idx_student_id_point ON scores(student_id, point);

