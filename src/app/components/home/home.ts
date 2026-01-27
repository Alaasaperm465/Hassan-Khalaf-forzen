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
      title: 'حركة الثلاجة',
      items: [
        { label: 'سند استلام', route: '/inbound' },
        { label: 'سند صرف', route: '/outbound' },
        { label: 'سند تحويل', route: '/sand-tahweel' },
        { label: 'سند تداخل أصناف', route: '/sand-tadahlol' },
        { label: 'محضر تداول عهدة عميل', route: '/mohadir-tadawol' },
        { label: 'تقرير العنابر الخاصة بالسندات ', route: '/taqrir-eanaber' },
        { label: 'بيان المنصرف عن يوم ', route: '/bayan-monsarif' },
      ]
    },
    {
      title: 'حركة التسجيل',
      items: [
        { label: 'طباعة كشوف تسجيل الجرد', route: '/tabaa-kushof-tajrid' },
        { label: 'تسجيل بيانات جرد عنبر', route: '/tasjeel-bianat-tajrid' },
        { label: 'لجنة غياب أمين المخزن', route: '/lognat-ghiyab-amin' },
        { label: 'نموذج ادخال رسالة كاملة', route: '/nomoj-idkhal-resala' },
        { label: 'تسجيل الرسائل الكاملة', route: '/tasjeel-resail-kamela' },
        { label: 'تعديل موقف الرسائل ', route: '/taadeel-mowqif-resail' },
        { label: 'طباعة الرسائل عن فترة ', route: '/tabaa-resail-fatera' },
        { label: 'بيانات رابط الخطابات بالرسائل', route: '/bianat-rabat-khetabat' }
      ]
    },
    {
      title: 'نظام التتبع',
      items: [
        { label: 'رسائل سندات الاستلام', route: '/resail-sand-astelam' },
        { label: 'رسائل سندات الصرف', route: '/resail-sand-serf' },
        { label: 'رسائل سندات التحويل', route: '/resail-sand-tahweel' },
        { label: 'رسائل سند التداخل', route: '/resail-sand-tadahlol' },
        { label: 'سندات يستوجب ربطها', route: '/sandaat-yastaujob-rabta' },
        { label: 'شهادات لم يتم ارسالها ', route: '/shahadat-lam-yotom-irsaal' },
        { label: 'موقوف التوقيع علي الافراجات ', route: '/mowqof-tawqee-afrajat' },
        { label: 'مطابقة ربط الشهادات بالسندات', route: '/mutabaqa-rabat-shahadat' },
        { label: 'بيان الافراجات بتاريخ الانتاج ', route: '/bayan-afrajat-tarekh' }
      ]
    }
  ];
}
