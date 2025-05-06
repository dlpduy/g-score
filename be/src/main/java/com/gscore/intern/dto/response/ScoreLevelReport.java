package com.gscore.intern.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreLevelReport {
    private String subject;
    private Long excellent;
    private Long good;
    private Long average;
    private Long weak;
}
