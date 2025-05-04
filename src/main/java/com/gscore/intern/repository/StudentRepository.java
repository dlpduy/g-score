package com.gscore.intern.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gscore.intern.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    @Query(value = """
        SELECT st.id AS id, SUM(sc.point) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_name = sub.name
        WHERE sub.name IN ('toan', 'vat_li', 'hoa_hoc')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<Student> findTopNStudentsByGroupA(@Param("n") int n);

    @Query(value = """
        SELECT st.id AS id, SUM(sc.point) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_name = sub.name
        WHERE sub.name IN ('toan', 'hoa_hoc', 'sinh_hoc')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<Student> findTopNStudentsByGroupB(@Param("n") int n);

    @Query(value = """
        SELECT st.id AS id, SUM(sc.point) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_name = sub.name
        WHERE sub.name IN ('ngu_van', 'lich_su', 'dia_li')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<Student> findTopNStudentsByGroupC(@Param("n") int n);

    @Query(value = """
        SELECT st.id AS id, SUM(sc.point) AS totalScore
        FROM students st
        JOIN scores sc ON st.id = sc.student_id
        JOIN subjects sub ON sc.subject_name = sub.name
        WHERE sub.name IN ('toan', 'ngoai_ngu', 'ngu_van')
        GROUP BY st.id
        ORDER BY totalScore DESC
        """, nativeQuery = true)
    List<Student> findTopNStudentsByGroupD(@Param("n") int n);
}
