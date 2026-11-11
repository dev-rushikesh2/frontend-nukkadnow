export type NotificationCategory = 
  | 'ORDER_INCOMING' 
  | 'CAPACITY_ALERT' 
  | 'LOW_STOCK' 
  | 'PAYMENT' 
  | 'SUBSCRIPTION';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  actionRoute?: string;
}

export interface NotificationPreferences {
  soundChimeEnabled: boolean;
  pushNotificationsEnabled: boolean;
  smsCustomerAlerts: boolean;
  highPriorityOrderChime: boolean;
}

export type NotificationsViewModel = any;
