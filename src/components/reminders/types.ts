export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate?: Date;
  instructions?: string;
  color: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  doctor: string;
  location: string;
  notes?: string;
  color: string;
}

export interface Reminder {
  id: string;
  type: 'medication' | 'appointment';
  referenceId: string;
  datetime: Date;
  completed: boolean;
}