package com.gscore.intern.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gscore.intern.dto.response.ResponseObject;
import com.gscore.intern.dto.response.SubjectResponse;
import com.gscore.intern.service.inter.SubjectServiceInterface;

@RestController
@RequestMapping("/api/v1/subjects")
public class SubjectController {

    private final SubjectServiceInterface subjectService;

    public SubjectController(SubjectServiceInterface subjectService) {
        this.subjectService = subjectService;
    }
    
    @GetMapping("")
    public ResponseEntity<ResponseObject<List<SubjectResponse>>> getAllSubject() {
        try {
            return ResponseEntity.ok(ResponseObject.<List<SubjectResponse>>builder()
                    .status(200)
                    .message("Subject found")
                    .data(subjectService.getAllSubjectName())
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(ResponseObject.<List<SubjectResponse>>builder()
                    .status(404)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }
}
