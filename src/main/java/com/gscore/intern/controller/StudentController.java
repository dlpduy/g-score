package com.gscore.intern.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gscore.intern.dto.response.ResponseObject;
import com.gscore.intern.dto.response.StudentResponse;
import com.gscore.intern.dto.response.StudentScoreResponse;
import com.gscore.intern.service.inter.StudentServiceInterface;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentServiceInterface studentService;

    public StudentController(StudentServiceInterface studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<StudentResponse>> getStudentById(@PathVariable String id) {
        try{
            return ResponseEntity.ok(ResponseObject.<StudentResponse>builder()
                    .status(200)
                    .message("Student found")
                    .data(studentService.getStudentById(id))
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(ResponseObject.<StudentResponse>builder()
                    .status(400)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

    @GetMapping("/{group}/{n}")
    public ResponseEntity<ResponseObject<List<StudentScoreResponse>>> getTopNStudent(@PathVariable String group ,@PathVariable int n) {
        try{
            List<StudentScoreResponse> studentScoreResponses = null;
            switch (group) {
                case "A":
                    studentScoreResponses = studentService.getStudentsTopGroupA(n);
                    break;
                case "B":
                    studentScoreResponses = studentService.getStudentsTopGroupB(n);
                    break;
                case "C":
                    studentScoreResponses = studentService.getStudentsTopGroupC(n);
                    break;
                case "D":
                    studentScoreResponses = studentService.getStudentsTopGroupD(n);
                    break;
                default:
                    throw new RuntimeException("Invalid group type");
            }
            return ResponseEntity.ok(ResponseObject.<List<StudentScoreResponse>>builder()
                    .status(200)
                    .message("Student found")
                    .data(studentScoreResponses)
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(ResponseObject.<List<StudentScoreResponse>>builder()
                    .status(400)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

    @GetMapping("/numbers")
    public ResponseEntity<ResponseObject<Object[]>> getNumberStudent() {
        try {
            return ResponseEntity.ok(ResponseObject.<Object[]>builder()
                    .status(200)
                    .message("Student found")
                    .data(studentService.getNumberStudent())
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(ResponseObject.<Object[]>builder()
                    .status(400)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

}
