DROP DATABASE IF EXISTS DiemthiTHPT;

CREATE DATABASE IF NOT EXISTS DiemthiTHPT;

USE DiemthiTHPT;


CREATE TABLE students (
    id VARCHAR(10) PRIMARY KEY
);

CREATE TABLE subjects (
	id INT	PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    point DOUBLE NOT NULL,
    student_id VARCHAR(10),
	subject_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
-- Bảng students: Đã có chỉ mục duy nhất cho registration_number
CREATE UNIQUE INDEX idx_id ON students(id);

-- Bảng subjects: Tạo chỉ mục cho tên môn học
CREATE INDEX idx_subject_id ON subjects(name);

-- Bảng scores: Tạo chỉ mục cho student_id và subject_id
CREATE INDEX idx_student_id ON scores(student_id);
CREATE INDEX idx_subject_id ON scores(subject_id);

-- Bảng scores: Tạo chỉ mục kết hợp cho student_id và subject_id
CREATE INDEX idx_student_subject ON scores(student_id, subject_id);

-- Bảng scores: Tạo chỉ mục kết hợp cho student_id và point
CREATE INDEX idx_student_id_point ON scores(student_id, point);

