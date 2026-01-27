import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  menuCategories: MenuCategory[] = [
    {
      title: 'حركة اللاحقه',
      items: [
        { label: 'سند اسلام' },
        { label: 'سند صرف' },
        { label: 'سند تحويل' },
        { label: 'سند داخل اصلاح' },
        { label: 'مختبر تطالبات هيئة عمل' },
        { label: 'تقرير القنوات التاجية بالمخزنات' },
        { label: 'بنك المسعرات عن بيوم' },
        { label: 'تقرير خسائر الملخوق' }
      ]
    },
    {
      title: 'حركة البلاحه',
      items: [
        { label: 'طلاقة كشف تسجيل الحد' },
        { label: 'تسجيل باقيات من عبر' },
        { label: 'لحنة غياب أمين المخزن' },
        { label: 'نموج ايجاد رسالة كاملة' },
        { label: 'تسجيل الرسائل المقفلة' },
        { label: 'تالعية الرسائل عن الحد' },
        { label: 'سالة رابط المتحققات بالرسائل' }
      ]
    },
    {
      title: 'نظام النسع',
      items: [
        { label: 'رسائل سند الاسلام' },
        { label: 'رسائل سند الصرف' },
        { label: 'رسائل سند التحويل' },
        { label: 'رسائل سند الباتحويل' },
        { label: 'سيغات بسيوجيث ريحتها' },
        { label: 'شيغات لم تتر ريحتاها' },
        { label: 'موقوف البرمج على الاجراطات' },
        { label: 'متطالقة ربط المسبواحات بالمخزنات' },
        { label: 'كتاب الاجراطات تاريخ الاضاحات' }
      ]
    }
  ];
}
