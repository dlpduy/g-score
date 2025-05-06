package com.gscore.intern.service.implement;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.gscore.intern.dto.response.ScoreLevelReport;
import com.gscore.intern.repository.ScoreRepository;
import com.gscore.intern.service.inter.ScoreServiceInterface;

@Service
public class ScoreServiceImpl implements ScoreServiceInterface {
    private final ScoreRepository scoreRepository;

    public ScoreServiceImpl(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }


    @Override
    @Cacheable(value = "scoreLevelReport", key = "#root.method.name")
    public List<ScoreLevelReport> getScoreLevelReport() {
        return scoreRepository.getScoreLevelReport();
    }
    
}
