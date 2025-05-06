package com.gscore.intern.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gscore.intern.dto.response.ResponseObject;
import com.gscore.intern.dto.response.ScoreLevelReport;
import com.gscore.intern.service.inter.ScoreServiceInterface;

@RestController
@RequestMapping("/api/v1/scores")
public class ScoreController {

    private final ScoreServiceInterface scoreService;
    
    public ScoreController(ScoreServiceInterface scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/level-report")
    public ResponseObject<List<ScoreLevelReport>> getScoreLevelReport() {
        try {
            return ResponseObject.<List<ScoreLevelReport>>builder()
                    .status(200)
                    .message("Score level report found")
                    .data(scoreService.getScoreLevelReport())
                    .build();
        } catch (RuntimeException e) {
            return ResponseObject.<List<ScoreLevelReport>>builder()
                    .status(400)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }
}
