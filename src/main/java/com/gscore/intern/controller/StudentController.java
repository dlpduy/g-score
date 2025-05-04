package com.gscore.intern.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gscore.intern.dto.response.ResponseObject;
import com.gscore.intern.dto.response.StudentResponse;
import com.gscore.intern.service.implement.StudentServiceImpl;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentServiceImpl studentService;

    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }
    @GetMapping("")
    public ResponseObject<List<StudentResponse>> getAllStudent() {
        return ResponseObject.<List<StudentResponse>>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getAllStudents())
                .build();
    }

    @GetMapping("/{id}")
    public ResponseObject<StudentResponse> getStudentById(@PathVariable String id) {
        return ResponseObject.<StudentResponse>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getStudentById(id))
                .build();
    }

    @GetMapping("/groupA/{n}")
    public ResponseObject<List<StudentResponse>> getTopNStudent(@PathVariable int n) {
        return ResponseObject.<List<StudentResponse>>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getStudentsTopGroupA(n))
                .build();
    }
    @GetMapping("/groupB/{n}")
    public ResponseObject<List<StudentResponse>> getTopNStudentGroupB(@PathVariable int n) {
        return ResponseObject.<List<StudentResponse>>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getStudentsTopGroupB(n))
                .build();
    }
    @GetMapping("/groupC/{n}")
    public ResponseObject<List<StudentResponse>> getTopNStudentGroupC(@PathVariable int n) {
        return ResponseObject.<List<StudentResponse>>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getStudentsTopGroupC(n))
                .build();
    }
    @GetMapping("/groupD/{n}")
    public ResponseObject<List<StudentResponse>> getTopNStudentGroupD(@PathVariable int n) {
        return ResponseObject.<List<StudentResponse>>builder()
                .status(200)
                .message("Student found")
                .data(studentService.getStudentsTopGroupD(n))
                .build();
    }
}
