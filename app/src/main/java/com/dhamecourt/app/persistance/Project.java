package com.dhamecourt.app.persistance;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Project {

	private final Long id;
	private final String name;
	private final LocalDate dateCreated;
}
