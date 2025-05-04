package com.gscore.intern.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gscore.intern.dto.response.ScoreSubject;
import com.gscore.intern.dto.response.StudentResponse;
import com.gscore.intern.dto.response.StudentScoreResponse;
import com.gscore.intern.model.Score;
import com.gscore.intern.model.Student;
import com.gscore.intern.repository.StudentRepository;
import com.gscore.intern.service.inter.StudentServiceInterface;

@Service
public class StudentServiceImpl implements StudentServiceInterface {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        if (students.isEmpty()) {
            throw new RuntimeException("No students found");
        }
        List<StudentResponse> studentResponses = new ArrayList<>();
        for (Student student : students) {
            List<ScoreSubject> scores = new ArrayList<>();
            for (Score score : student.getScores()) {
                String subjectName = score.getSubject().getName();
                String scoreSubject = String.valueOf(score.getPoint());
                if (subjectName.equals("ma_ngoai_ngu")) {
                    scoreSubject = 'N' + String.valueOf((int) Math.floor(score.getPoint()));
                }
                scores.add(ScoreSubject.builder()
                        .name(score.getSubject().getName())
                        .score(scoreSubject)
                        .build());
            }
            studentResponses.add(StudentResponse.builder()
                    .id(student.getId())
                    .scores(scores)
                    .build());
        }

        return studentResponses;
    }

    @Override
    public StudentResponse getStudentById(String id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student currentStudent = student.get();
            List<ScoreSubject> scores = new ArrayList<>();
            for (Score score : currentStudent.getScores()) {
                String subjectName = score.getSubject().getName();
                String scoreSubject = String.valueOf(score.getPoint());
                if (subjectName.equals("ma_ngoai_ngu")) {
                    scoreSubject = 'N' + String.valueOf((int) Math.floor(score.getPoint()));
                }
                scores.add(ScoreSubject.builder()
                        .name(score.getSubject().getName())
                        .score(scoreSubject)
                        .build());
            }


            return StudentResponse.builder()
                    .id(currentStudent.getId())
                    .scores(scores)
                    .build();
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    @Override
    public List<StudentScoreResponse> getStudentsTopGroup(String group, int n) {
        List<StudentScoreResponse> students;
        if (group.equals("A")) {
            students = studentRepository.findTopNStudentsByGroupA(n)
                            .stream()
                            .limit(n)
                            .collect(Collectors.toList());
        } else if (group.equals("B")) {
            students = studentRepository.findTopNStudentsByGroupB(n)
                            .stream()
                            .limit(n)
                            .collect(Collectors.toList());
        } else if (group.equals("C")) {
            students = studentRepository.findTopNStudentsByGroupC(n)
                            .stream()
                            .limit(n)
                            .collect(Collectors.toList());
        } else if (group.equals("D")) {
            students = studentRepository.findTopNStudentsByGroupD(n)
                            .stream()
                            .limit(n)
                            .collect(Collectors.toList());
        }
        else {
            throw new RuntimeException("Invalid group: " + group);
        }
        if (students.isEmpty()) {
            throw new RuntimeException("No students found in group " + group);
        }
        return students;
    }

    @Override
    public Object[] getNumberStudent() {
        return studentRepository.countStudents();
    }

    
}
