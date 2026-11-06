import java.util.ArrayList;
import java.util.List;

// Main Hostel Management System Entry Point
public class HostelManagementSystem {

    // Student Model Class
    static class Student {
        private String id;
        private String name;
        private String roomNumber;
        private boolean isFeePaid;

        public Student(String id, String name, String roomNumber) {
            this.id = id;
            this.name = name;
            this.roomNumber = roomNumber;
            this.isFeePaid = false;
        }

        public String getId() { return id; }
        public String getName() { return name; }
        public String getRoomNumber() { return roomNumber; }
        public boolean isFeePaid() { return isFeePaid; }
        public void setFeePaid(boolean feePaid) { isFeePaid = feePaid; }

        @Override
        public String toString() {
            return String.format("Student ID: %s | Name: %s | Room: %s | Fee Paid: %b", id, name, roomNumber, isFeePaid);
        }
    }

    // Room Model Class
    static class Room {
        private String roomNumber;
        private int capacity;
        private int occupied;

        public Room(String roomNumber, int capacity) {
            this.roomNumber = roomNumber;
            this.capacity = capacity;
            this.occupied = 0;
        }

        public String getRoomNumber() { return roomNumber; }
        public boolean isAvailable() { return occupied < capacity; }
        public void allocate() { if (isAvailable()) occupied++; }
        public void deallocate() { if (occupied > 0) occupied--; }

        @Override
        public String toString() {
            return String.format("Room %s | Occupancy: %d/%d", roomNumber, occupied, capacity);
        }
    }

    // Main Execution Method
    public static void main(String[] args) {
        System.out.println("=== HOSTEL MANAGEMENT SYSTEM BACKEND LOGIC ===");

        // Data Storage
        List<Room> rooms = new ArrayList<>();
        List<Student> students = new ArrayList<>();

        // Create Rooms
        Room r1 = new Room("101", 2);
        Room r2 = new Room("102", 2);
        rooms.add(r1);
        rooms.add(r2);

        // Register Student
        System.out.println("
--- Registering Students ---");
        if (r1.isAvailable()) {
            Student s1 = new Student("S101", "Alex Johnson", r1.getRoomNumber());
            r1.allocate();
            students.add(s1);
            System.out.println("Allocated: " + s1.getName() + " to Room " + r1.getRoomNumber());
        }

        // Process Fee Payment
        System.out.println("
--- Fee Payment Processing ---");
        Student s = students.get(0);
        s.setFeePaid(true);
        System.out.println("Payment Updated: " + s);

        // Print Summary Report
        System.out.println("
--- Current Hostel Summary ---");
        for (Room room : rooms) {
            System.out.println(room);
        }
    }
}
