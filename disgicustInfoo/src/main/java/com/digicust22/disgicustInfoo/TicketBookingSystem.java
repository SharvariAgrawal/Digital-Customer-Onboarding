package com.digicust22.disgicustInfoo;

public class TicketBookingSystem extends Thread {
	
	
	private static int avaibletickets= 10;
	private String userName;
	private int ticketBook;
	
	
	public TicketBookingSystem(String userNAme, int ticketBook) {
		this.userName = userNAme;
		this.ticketBook = ticketBook;
	}





	@Override
	public void run() {
    synchronized (TicketBookingSystem.class) {
		
	
		System.out.println(userName + "is trying to book tickests" + ticketBook );
		if(ticketBook <= avaibletickets) {
			System.out.println("booking done for user " + userName);
			avaibletickets = avaibletickets - ticketBook ;
			System.out.println("avaible tickets are " + avaibletickets );
		}else {
			System.out.println(" booking fail for " + userName);
		}
	
    }
	}
}
