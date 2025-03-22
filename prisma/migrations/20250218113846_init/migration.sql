-- CreateTable
CREATE TABLE `Instructor` (
    `InstructorId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Mobile` VARCHAR(10) NOT NULL,
    `CustomerId` INTEGER NOT NULL,

    UNIQUE INDEX `Instructor_Email_key`(`Email`),
    PRIMARY KEY (`InstructorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
