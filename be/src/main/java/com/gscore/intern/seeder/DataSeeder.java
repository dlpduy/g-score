package com.gscore.intern.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gscore.intern.service.implement.SeederServiceImpl;
@Component
public class DataSeeder implements CommandLineRunner {
    private SeederServiceImpl seederService;

    public DataSeeder(SeederServiceImpl seederService) {
        this.seederService = seederService;
    }

    @Override
    public void run(String... args) throws Exception {
        seederService.seedData(args);
    }
    
}
