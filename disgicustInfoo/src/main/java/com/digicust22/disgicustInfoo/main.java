package com.digicust22.disgicustInfoo;

public class main {

	public static void main(String[] args) {
		
		TicketBookingSystem user1 = new TicketBookingSystem("manish", 3);
		TicketBookingSystem user2 = new TicketBookingSystem("ravi", 5);
		TicketBookingSystem user3 = new TicketBookingSystem("ravina", 5);


		user1.start();
user2.start();
user3.start();
	}

}
