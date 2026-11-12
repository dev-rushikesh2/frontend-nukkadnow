import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface PreorderItemDetail {
  title: string;
  quantity: number;
  pricePaise: number;
}

export interface MerchantPreorder {
  id: string;
  orderNumber: string;
  token: string;
  customerName: string;
  customerPhone: string;
  scheduledDate: string;
  scheduledTimeRange: string;
  dayCategory: 'TODAY' | 'TOMORROW' | 'WEEKEND';
  items: PreorderItemDetail[];
  totalPaise: number;
  status: 'CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'COLLECTED';
  paymentMode: string;
}

@Component({
  selector: 'merchant-preorders-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './preorders-list.page.html',
  styleUrls: ['./preorders-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreordersListPageComponent {
  // Date Filter: 'ALL' | 'TODAY' | 'TOMORROW' | 'WEEKEND'
  readonly filterDate = signal<'ALL' | 'TODAY' | 'TOMORROW' | 'WEEKEND'>('ALL');

  // Status Filter: 'ALL' | 'CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'COLLECTED'
  readonly filterStatus = signal<'ALL' | 'CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'COLLECTED'>('ALL');

  // Search
  readonly searchQuery = signal<string>('');

  // Toast
  readonly toastMessage = signal<string | null>(null);

  // Preorders Signal
  readonly preorders = signal<MerchantPreorder[]>([
    {
      id: 'pre-101',
      orderNumber: '#PRE-8910',
      token: 'P-08',
      customerName: 'Ananya Sharma',
      customerPhone: '+91 98220 12345',
      scheduledDate: 'Tomorrow, 12 Nov',
      scheduledTimeRange: '11:00 AM – 11:30 AM',
      dayCategory: 'TOMORROW',
      items: [
        { title: 'Nagpur Orange Barfi (1 kg Festive Box)', quantity: 2, pricePaise: 64000 },
        { title: 'Besan Ladoo Pack (500g)', quantity: 1, pricePaise: 25000 }
      ],
      totalPaise: 89000,
      status: 'CONFIRMED',
      paymentMode: 'UPI (Advance Confirmed)'
    },
    {
      id: 'pre-102',
      orderNumber: '#PRE-8909',
      token: 'P-07',
      customerName: 'Rajesh Kulkarni',
      customerPhone: '+91 98221 67890',
      scheduledDate: 'Today, 11 Nov',
      scheduledTimeRange: '05:30 PM – 06:00 PM',
      dayCategory: 'TODAY',
      items: [
        { title: 'Paneer Samosa Party Box (20 pcs)', quantity: 1, pricePaise: 50000 },
        { title: 'Mint Chutney 200g', quantity: 2, pricePaise: 6000 }
      ],
      totalPaise: 56000,
      status: 'IN_PREPARATION',
      paymentMode: 'UPI (Advance Confirmed)'
    },
    {
      id: 'pre-103',
      orderNumber: '#PRE-8908',
      token: 'P-05',
      customerName: 'Dr. Vikram Deshpande',
      customerPhone: '+91 94228 98765',
      scheduledDate: 'Today, 11 Nov',
      scheduledTimeRange: '04:00 PM – 04:30 PM',
      dayCategory: 'TODAY',
      items: [
        { title: 'Sugar-free Dry Fruit Barfi 500g', quantity: 2, pricePaise: 72000 }
      ],
      totalPaise: 72000,
      status: 'READY_FOR_PICKUP',
      paymentMode: 'UPI (Advance Confirmed)'
    },
    {
      id: 'pre-104',
      orderNumber: '#PRE-8907',
      token: 'P-03',
      customerName: 'Meenakshi Iyer',
      customerPhone: '+91 98900 45678',
      scheduledDate: 'This Weekend (Sat)',
      scheduledTimeRange: '10:00 AM – 10:30 AM',
      dayCategory: 'WEEKEND',
      items: [
        { title: 'Fresh Kaju Katli (1 kg)', quantity: 3, pricePaise: 270000 },
        { title: 'Mysore Pak (500g)', quantity: 2, pricePaise: 60000 }
      ],
      totalPaise: 330000,
      status: 'CONFIRMED',
      paymentMode: 'UPI (Advance Confirmed)'
    }
  ]);

  // KPIs
  readonly totalValuePaise = computed(() =>
    this.preorders().reduce((acc, o) => acc + o.totalPaise, 0)
  );

  // Filtered List
  readonly filteredPreorders = computed(() => {
    const d = this.filterDate();
    const s = this.filterStatus();
    const q = this.searchQuery().toLowerCase().trim();

    return this.preorders().filter(o => {
      const matchDate = d === 'ALL' || o.dayCategory === d;
      const matchStatus = s === 'ALL' || o.status === s;
      const matchSearch = !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q);

      return matchDate && matchStatus && matchSearch;
    });
  });

  setDateFilter(d: 'ALL' | 'TODAY' | 'TOMORROW' | 'WEEKEND') {
    this.filterDate.set(d);
  }

  setStatusFilter(s: 'ALL' | 'CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'COLLECTED') {
    this.filterStatus.set(s);
  }

  advanceOrderStatus(orderId: string) {
    this.preorders.update(list =>
      list.map(o => {
        if (o.id === orderId) {
          let nextStatus: MerchantPreorder['status'] = o.status;
          if (o.status === 'CONFIRMED') nextStatus = 'IN_PREPARATION';
          else if (o.status === 'IN_PREPARATION') nextStatus = 'READY_FOR_PICKUP';
          else if (o.status === 'READY_FOR_PICKUP') nextStatus = 'COLLECTED';

          this.showToast(`Order ${o.orderNumber} advanced to ${nextStatus.replace(/_/g, ' ')}!`);
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2800);
  }
}
