package com.gscore.intern.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gscore.intern.dto.response.ScoreLevelReport;
import com.gscore.intern.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query(value = """
    SELECT 
        sub.name AS subject,
        CAST(SUM(CASE WHEN sc.point >= 8 THEN 1 ELSE 0 END) AS SIGNED) AS excellent,
        CAST(SUM(CASE WHEN sc.point >= 6 AND sc.point < 8 THEN 1 ELSE 0 END) AS SIGNED) AS good,
        CAST(SUM(CASE WHEN sc.point >= 4 AND sc.point < 6 THEN 1 ELSE 0 END) AS SIGNED) AS average,
        CAST(SUM(CASE WHEN sc.point < 4 THEN 1 ELSE 0 END) AS SIGNED) AS weak
    FROM scores sc
    JOIN subjects sub ON sc.subject_id = sub.id
    GROUP BY sub.name
    ORDER BY sub.name
    """, nativeQuery = true)
    List<ScoreLevelReport> getScoreLevelReport(); 
}
