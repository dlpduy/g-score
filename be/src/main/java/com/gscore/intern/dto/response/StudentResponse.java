package com.gscore.intern.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponse {
    private String id;
    private List<ScoreSubject> scores;
}
