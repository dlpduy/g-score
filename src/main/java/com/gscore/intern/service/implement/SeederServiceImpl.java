package com.gscore.intern.service.implement;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.gscore.intern.model.Score;
import com.gscore.intern.model.Student;
import com.gscore.intern.model.Subject;
import com.gscore.intern.repository.StudentRepository;
import com.gscore.intern.repository.SubjectRepository;
import com.gscore.intern.service.inter.SeederServiceInterface;
import com.opencsv.CSVReader;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class SeederServiceImpl implements SeederServiceInterface {

    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final EntityManager entityManager;

    @Value("classpath:test.csv")
    private Resource csvFile;

    private static final int BATCH_SIZE = 500;

    public SeederServiceImpl(StudentRepository studentRepository, SubjectRepository subjectRepository, EntityManager entityManager) {
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.entityManager = entityManager;
    }

    @Override
    public void seedData(String... args) throws Exception {
        if (studentRepository.count() > 0) {
            System.out.println("Database already seeded. Skipping seeding.");
            return;
        }

        try (Reader reader = new InputStreamReader(csvFile.getInputStream());
             CSVReader csvReader = new CSVReader(reader)) {

            String[] headers = csvReader.readNext();
            if (headers == null || headers.length == 0) {
                throw new IllegalStateException("CSV file has no headers.");
            }

            Set<String> skipCols = Set.of("sbd");
            List<String> subjectNames = new ArrayList<>();

            for (String header : headers) {
                String cleanHeader = header.trim().toLowerCase();
                if (!skipCols.contains(cleanHeader)) {
                    subjectNames.add(header.trim());
                }
            }

            // Create subjects if not exist
            for (String subjectName : subjectNames) {
                subjectRepository.findByName(subjectName).orElseGet(() -> {
                    Subject newSubject = Subject.builder().name(subjectName).build();
                    subjectRepository.save(newSubject);
                    System.out.println("Created subject: " + subjectName);
                    return newSubject;
                });
            }

            // Insert students in batch
            String[] line;
            List<Student> studentBatch = new ArrayList<>();
            int count = 0;

            while ((line = csvReader.readNext()) != null) {
                if (line.length == 0 || line[0].isBlank()) continue;

                String regNumber = line[0].trim();
                Student student = Student.builder()
                        .id(regNumber)
                        .scores(new ArrayList<>())
                        .build();

                for (int i = 1; i < headers.length; i++) {
                    String header = headers[i].trim();
                    if (skipCols.contains(header.toLowerCase())) continue;

                    String scoreStr = (i < line.length) ? line[i].trim() : "";
                    if (scoreStr.isBlank()) continue;

                    try {
                        double point = Double.parseDouble(scoreStr.replaceAll("[^0-9.]", ""));
                        Subject subject = subjectRepository.findByName(header)
                                .orElseThrow(() -> new RuntimeException("Subject not found: " + header));

                        Score score = Score.builder()
                                .subject(subject)
                                .student(student)
                                .point(point)
                                .build();

                        student.getScores().add(score);
                    } catch (NumberFormatException ex) {
                        System.err.println("Invalid score for student " + regNumber + " in " + header + ": " + scoreStr);
                    }
                }

                studentBatch.add(student);
                count++;

                if (count % BATCH_SIZE == 0) {
                    studentRepository.saveAll(studentBatch);
                    entityManager.flush();
                    entityManager.clear();
                    studentBatch.clear();
                    System.out.println("Inserted: " + count + " students");
                }
            }

            if (!studentBatch.isEmpty()) {
                studentRepository.saveAll(studentBatch);
                entityManager.flush();
                entityManager.clear();
                System.out.println("Final batch inserted. Total students: " + count);
            }

            System.out.println("✅ Data seeding completed.");

        } catch (Exception ex) {
            System.err.println("❌ Seeding failed: " + ex.getMessage());
            throw ex;
        }
    }
}
