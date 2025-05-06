package com.gscore.intern.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreSubject {
    private String name;
    private String score;
}
