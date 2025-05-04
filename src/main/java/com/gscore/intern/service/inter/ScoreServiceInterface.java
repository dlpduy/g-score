package com.gscore.intern.service.inter;

import java.util.List;

import com.gscore.intern.dto.response.ScoreLevelReport;

public interface ScoreServiceInterface {
    List<ScoreLevelReport> getScoreLevelReport();
}
