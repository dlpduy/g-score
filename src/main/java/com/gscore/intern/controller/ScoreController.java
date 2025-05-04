package com.gscore.intern.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gscore.intern.dto.response.ResponseObject;
import com.gscore.intern.dto.response.ScoreLevelReport;
import com.gscore.intern.service.implement.ScoreServiceImpl;

@RestController
@RequestMapping("/api/v1/scores")
public class ScoreController {

    private final ScoreServiceImpl scoreService;
    
    public ScoreController(ScoreServiceImpl scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/level-report")
    public ResponseObject<List<ScoreLevelReport>> getScoreLevelReport() {
        return ResponseObject.<List<ScoreLevelReport>>builder()
                .status(200)
                .message("Score level report found")
                .data(scoreService.getScoreLevelReport())
                .build();
    }
}
