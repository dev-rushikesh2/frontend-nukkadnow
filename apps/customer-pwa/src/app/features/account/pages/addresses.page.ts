import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export interface AddressItem {
  id: number;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
  fullAddress: string;
  city: string;
  pincode: string;
}

@Component({
  selector: 'app-addresses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, CustomerShellComponent],
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesPageComponent {
  private router = inject(Router);

  readonly addresses = signal<AddressItem[]>([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      fullAddress: 'Flat 302, Sai Residency, Civil Lines, Amravati – 444601',
      city: 'Amravati',
      pincode: '444601'
    },
    {
      id: 2,
      type: 'Work',
      isDefault: false,
      fullAddress: 'Office No. 204, Tech Park, MIDC Road, Amravati – 444605',
      city: 'Amravati',
      pincode: '444605'
    },
    {
      id: 3,
      type: 'Other',
      isDefault: false,
      fullAddress: 'Near Ambadevi Mandir, Rajapeth, Amravati – 444602',
      city: 'Amravati',
      pincode: '444602'
    }
  ]);

  readonly selectedAddressId = signal<number>(1);
  readonly editingId = signal<number | null>(null);

  // Form State
  readonly addressType = signal<'Home' | 'Work' | 'Other'>('Home');
  fullAddress = '';
  city = 'Amravati';
  pincode = '444601';

  readonly toastMessage = signal<string | null>(null);
  readonly mapPickerActive = signal<boolean>(false);
  readonly mapCoords = signal<string | null>(null);

  readonly cityOptions = ['Amravati', 'Nagpur', 'Pune', 'Mumbai', 'Nashik', 'Aurangabad'];

  goBack() {
    this.router.navigate(['/account']);
  }

  selectAddress(id: number) {
    this.selectedAddressId.set(id);
    this.showToast('Delivery address updated');
  }

  setType(type: 'Home' | 'Work' | 'Other') {
    this.addressType.set(type);
  }

  editAddress(addr: AddressItem, event: Event) {
    event.stopPropagation();
    this.editingId.set(addr.id);
    this.addressType.set(addr.type);
    this.fullAddress = addr.fullAddress;
    this.city = addr.city;
    this.pincode = addr.pincode;

    const el = document.getElementById('address-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  deleteAddress(id: number, event: Event) {
    event.stopPropagation();
    const current = this.addresses();
    if (current.length <= 1) {
      this.showToast('You must have at least one delivery address');
      return;
    }
    const filtered = current.filter(a => a.id !== id);
    this.addresses.set(filtered);
    if (this.selectedAddressId() === id) {
      this.selectedAddressId.set(filtered[0].id);
    }
    this.showToast('Address removed');
  }

  scrollToForm() {
    this.editingId.set(null);
    this.fullAddress = '';
    const el = document.getElementById('address-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  triggerMapLocation() {
    this.mapPickerActive.set(true);
    setTimeout(() => {
      this.mapPickerActive.set(false);
      this.mapCoords.set('20.9320° N, 77.7523° E (Sai Nagar, Amravati)');
      if (!this.fullAddress) {
        this.fullAddress = 'Flat 101, Om Residency, Near Sai Temple, Sai Nagar';
      }
      this.pincode = '444607';
      this.showToast('Location accurately detected on map (±3m)');
    }, 700);
  }

  saveAddress() {
    const trimmed = this.fullAddress.trim();
    if (!trimmed) {
      this.showToast('Please enter your full address');
      return;
    }

    const editId = this.editingId();
    if (editId !== null) {
      // Update existing
      this.addresses.update(list =>
        list.map(item =>
          item.id === editId
            ? {
                ...item,
                type: this.addressType(),
                fullAddress: trimmed,
                city: this.city,
                pincode: this.pincode
              }
            : item
        )
      );
      this.editingId.set(null);
      this.showToast('Address updated successfully');
    } else {
      // Create new
      const newId = Date.now();
      const newAddr: AddressItem = {
        id: newId,
        type: this.addressType(),
        isDefault: this.addresses().length === 0,
        fullAddress: trimmed,
        city: this.city,
        pincode: this.pincode
      };
      this.addresses.update(list => [...list, newAddr]);
      this.selectedAddressId.set(newId);
      this.showToast('New address saved successfully');
    }

    // Reset inputs
    this.fullAddress = '';
    this.mapCoords.set(null);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.fullAddress = '';
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2800);
  }
}
