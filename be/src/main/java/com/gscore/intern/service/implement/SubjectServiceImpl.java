package com.gscore.intern.service.implement;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.gscore.intern.dto.response.SubjectResponse;
import com.gscore.intern.repository.SubjectRepository;
import com.gscore.intern.service.inter.SubjectServiceInterface;


@Service
public class SubjectServiceImpl implements SubjectServiceInterface {

    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    
    @Override
    @Cacheable(value = "subjectName", key = "#root.method.name")
    public List<SubjectResponse> getAllSubjectName() {
        List<SubjectResponse> subjectResponses = subjectRepository.findAllByOrderByIdAsc().stream()
                .map(subject -> SubjectResponse.builder()
                        .id(subject.getId())
                        .name(subject.getName())
                        .build())
                .toList();
        if (subjectResponses.isEmpty()) {
            throw new RuntimeException("No subjects found");
        }
        return subjectResponses;
    }
    
}
