package com.gscore.intern.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gscore.intern.dto.response.StudentScoreResponse;
import com.gscore.intern.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    @Query(value = """
        SELECT st.id AS id, ROUND(SUM(sc.point), 2) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_id = sub.id
        WHERE sub.name IN ('toan', 'vat_li', 'hoa_hoc')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<StudentScoreResponse> findTopNStudentsByGroupA(@Param("n") int n);
    

    @Query(value = """
        SELECT st.id AS id, ROUND(SUM(sc.point), 2) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_id = sub.id
        WHERE sub.name IN ('toan', 'hoa_hoc', 'sinh_hoc')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<StudentScoreResponse> findTopNStudentsByGroupB(@Param("n") int n);

    @Query(value = """
        SELECT st.id AS id, ROUND(SUM(sc.point), 2) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_id = sub.id
        WHERE sub.name IN ('ngu_van', 'lich_su', 'dia_li')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<StudentScoreResponse> findTopNStudentsByGroupC(@Param("n") int n);

    @Query(value = """
        SELECT st.id AS id, ROUND(SUM(sc.point), 2) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_id = sub.id
        WHERE sub.name IN ('toan', 'ngoai_ngu', 'ngu_van')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<StudentScoreResponse> findTopNStudentsByGroupD(@Param("n") int n);

    @Query(value = """
        SELECT 
            COUNT(CASE WHEN subject_count < 7 THEN 1 END) AS studentsWith7Subjects
        FROM (
            SELECT student_id, COUNT(DISTINCT subject_id) AS subject_count
            FROM scores
            GROUP BY student_id
        ) AS subquery;
        """, nativeQuery = true)
    Long countStudentsNot12();
}
