// ShopSaathi - Complete Fake Data Layer
// All data matching PRD Section 18 data model

const AppData = {
  // ─── PRODUCTS ─────────────────────────────────────────
  products: [
    {
      product_id: 'P001',
      name: 'Cement (ACC/Ambuja)',
      nameHi: 'सीमेंट',
      unit: 'Bags',
      unitHi: 'बोरी',
      type: 'inventory_held',
      floor_price: 340,
      typical_market_price: 370,
      competitive_benchmark_price: 360,
      related_products: ['P002', 'P003', 'P004'],
      is_active: true
    },
    {
      product_id: 'P002',
      name: 'Sand (Reti)',
      nameHi: 'रेती',
      unit: 'Brass',
      unitHi: 'ब्रास',
      type: 'supplier_procured',
      floor_price: 3200,
      typical_market_price: 3800,
      competitive_benchmark_price: 3500,
      related_products: ['P001', 'P003'],
      is_active: true
    },
    {
      product_id: 'P003',
      name: 'Gitti',
      nameHi: 'गिट्टी',
      unit: 'Brass',
      unitHi: 'ब्रास',
      type: 'supplier_procured',
      floor_price: 2800,
      typical_market_price: 3200,
      competitive_benchmark_price: 3000,
      related_products: ['P001', 'P002'],
      is_active: true
    },
    {
      product_id: 'P004',
      name: 'Bricks',
      nameHi: 'ईंट',
      unit: 'Pieces',
      unitHi: 'नग',
      type: 'supplier_procured',
      floor_price: 6,
      typical_market_price: 8,
      competitive_benchmark_price: 7,
      related_products: ['P001', 'P005'],
      is_active: true
    },
    {
      product_id: 'P005',
      name: 'Fly Ash Bricks',
      nameHi: 'फ्लाई ऐश ईंट',
      unit: 'Pieces',
      unitHi: 'नग',
      type: 'supplier_procured',
      floor_price: 5,
      typical_market_price: 7,
      competitive_benchmark_price: 6,
      related_products: ['P001', 'P004'],
      is_active: true
    }
  ],

  // ─── CUSTOMERS ────────────────────────────────────────
  customers: [
    {
      customer_id: 'C001',
      phone: '9876543210',
      name: 'Rajesh Sharma',
      type: 'contractor',
      address: 'Vijay Nagar, Indore',
      payment_history_status: 'good',
      average_days_to_pay: 3,
      outstanding_dues: 0,
      created_at: '2025-06-15',
      notes: 'Regular contractor, reliable payments',
      last_order: { product: 'Cement', date: '2026-02-18', amount: 18500 }
    },
    {
      customer_id: 'C002',
      phone: '9123456780',
      name: 'Sunil Patel',
      type: 'builder',
      address: 'Palasia, Indore',
      payment_history_status: 'slow',
      average_days_to_pay: 12,
      outstanding_dues: 24500,
      created_at: '2025-04-20',
      notes: 'Big orders but slow payment',
      last_order: { product: 'Sand + Gitti', date: '2026-02-15', amount: 35000 }
    },
    {
      customer_id: 'C003',
      phone: '9988776655',
      name: 'Amit Verma',
      type: 'regular',
      address: 'Bhawarkuan, Indore',
      payment_history_status: 'good',
      average_days_to_pay: 1,
      outstanding_dues: 0,
      created_at: '2025-09-01',
      notes: 'Always pays cash on delivery',
      last_order: { product: 'Cement', date: '2026-02-10', amount: 7400 }
    },
    {
      customer_id: 'C004',
      phone: '9871234560',
      name: 'Priya Singh',
      type: 'walk_in',
      address: 'Sapna Sangeeta, Indore',
      payment_history_status: 'good',
      average_days_to_pay: 0,
      outstanding_dues: 0,
      created_at: '2026-02-18',
      notes: 'New customer',
      last_order: null
    },
    {
      customer_id: 'C005',
      phone: '9090909090',
      name: 'Mahesh Joshi',
      type: 'contractor',
      address: 'Scheme No. 54, Indore',
      payment_history_status: 'problematic',
      average_days_to_pay: 21,
      outstanding_dues: 45000,
      created_at: '2025-03-10',
      notes: 'Frequently delays payment, needs follow-up',
      last_order: { product: 'Bricks + Cement', date: '2026-02-05', amount: 52000 }
    },
    {
      customer_id: 'C006',
      phone: '9876001122',
      name: 'Dinesh Kumar',
      type: 'regular',
      address: 'MR-10, Indore',
      payment_history_status: 'good',
      average_days_to_pay: 2,
      outstanding_dues: 3700,
      created_at: '2025-07-12',
      notes: '',
      last_order: { product: 'Sand', date: '2026-02-17', amount: 7600 }
    },
    {
      customer_id: 'C007',
      phone: '9111222333',
      name: 'Ravi Malhotra',
      type: 'builder',
      address: 'AB Road, Indore',
      payment_history_status: 'slow',
      average_days_to_pay: 8,
      outstanding_dues: 18000,
      created_at: '2025-08-05',
      notes: 'Large builder, negotiates hard',
      last_order: { product: 'Cement + Gitti', date: '2026-02-12', amount: 68000 }
    },
    {
      customer_id: 'C008',
      phone: '9555666777',
      name: 'Sanjay Tiwari',
      type: 'contractor',
      address: 'Sukhliya, Indore',
      payment_history_status: 'good',
      average_days_to_pay: 5,
      outstanding_dues: 0,
      created_at: '2025-11-20',
      notes: 'Referred by Rajesh Sharma',
      last_order: { product: 'Fly Ash Bricks', date: '2026-02-14', amount: 14000 }
    }
  ],

  // ─── SUPPLIERS ────────────────────────────────────────
  suppliers: [
    {
      supplier_id: 'S001',
      name: 'Sharma Traders',
      contact_name: 'Ramesh Sharma',
      phone: '9800011122',
      products_supplied: ['P002', 'P003'],
      location_lat: 22.7196,
      location_lng: 75.8577,
      area: 'Dewas Naka, Indore',
      typical_price: { P002: 3400, P003: 2900 },
      typical_delivery_minutes: 90,
      payment_terms: 'COD',
      reliability_score: 85,
      is_active: true,
      notes: 'Reliable, sometimes late on Saturdays',
      outstanding_payment: 12000,
      active_orders_count: 2,
      total_in_transit: 28000
    },
    {
      supplier_id: 'S002',
      name: 'Patel & Sons',
      contact_name: 'Mukesh Patel',
      phone: '9800033344',
      products_supplied: ['P002', 'P003', 'P004'],
      location_lat: 22.7533,
      location_lng: 75.8937,
      area: 'Pithampur Road, Indore',
      typical_price: { P002: 3500, P003: 3000, P004: 7 },
      typical_delivery_minutes: 120,
      payment_terms: 'Credit 7 days',
      reliability_score: 92,
      is_active: true,
      notes: 'Best quality sand, slightly expensive',
      outstanding_payment: 35000,
      active_orders_count: 1,
      total_in_transit: 15000
    },
    {
      supplier_id: 'S003',
      name: 'Raj Suppliers',
      contact_name: 'Vijay Raj',
      phone: '9800055566',
      products_supplied: ['P004', 'P005'],
      location_lat: 22.6876,
      location_lng: 75.8314,
      area: 'Rau, Indore',
      typical_price: { P004: 6.5, P005: 5.5 },
      typical_delivery_minutes: 60,
      payment_terms: 'Pay before dispatch',
      reliability_score: 71,
      is_active: true,
      notes: 'Cheapest bricks, quality varies',
      outstanding_payment: 0,
      active_orders_count: 1,
      total_in_transit: 8500
    },
    {
      supplier_id: 'S004',
      name: 'Gupta Cement Depot',
      contact_name: 'Anil Gupta',
      phone: '9800077788',
      products_supplied: ['P001'],
      location_lat: 22.7300,
      location_lng: 75.8600,
      area: 'Palda, Indore',
      typical_price: { P001: 330 },
      typical_delivery_minutes: 45,
      payment_terms: 'Credit 3 days',
      reliability_score: 88,
      is_active: true,
      notes: 'Primary cement supplier, ACC and Ambuja',
      outstanding_payment: 22000,
      active_orders_count: 1,
      total_in_transit: 33000
    }
  ],

  // ─── WORKERS ──────────────────────────────────────────
  workers: [
    {
      worker_id: 'W001',
      name: 'Ramsingh',
      phone: '9700011100',
      type: 'delivery',
      daily_wage_rate: 500,
      is_active: true,
      notes: 'Senior driver, knows all routes'
    },
    {
      worker_id: 'W002',
      name: 'Lakhan',
      phone: '9700022200',
      type: 'loading',
      daily_wage_rate: 400,
      is_active: true,
      notes: 'Loading specialist'
    },
    {
      worker_id: 'W003',
      name: 'Bhura',
      phone: '9700033300',
      type: 'delivery',
      daily_wage_rate: 450,
      is_active: true,
      notes: 'Handles collections well'
    },
    {
      worker_id: 'W004',
      name: 'Sonu',
      phone: '9700044400',
      type: 'shop_helper',
      daily_wage_rate: 350,
      is_active: true,
      notes: 'New, learning'
    }
  ],

  // ─── ATTENDANCE (Today) ───────────────────────────────
  attendance: [
    { worker_id: 'W001', date: '2026-02-20', marked_present_at: '08:15', marked_by: 'father' },
    { worker_id: 'W002', date: '2026-02-20', marked_present_at: '08:30', marked_by: 'father' },
    { worker_id: 'W003', date: '2026-02-20', marked_present_at: null, marked_by: null },
    { worker_id: 'W004', date: '2026-02-20', marked_present_at: '08:00', marked_by: 'father' }
  ],

  // ─── ORDERS ───────────────────────────────────────────
  orders: [
    {
      order_id: 'ORD001',
      customer_id: 'C001',
      status: 'out_for_delivery',
      products: [
        { product_id: 'P001', quantity: 50, unit: 'Bags', quoted_price: 370, floor_price: 340, margin: 30, supplier_id: 'S004', supplier_committed_time: '11:00', delivery_status: 'dispatched' }
      ],
      delivery_address: 'Site #12, Vijay Nagar, Indore',
      delivery_deadline_agreed: '2026-02-20T12:00',
      delivery_actual_time: null,
      total_amount: 18500,
      pipeline_timestamps: {
        created_at: '2026-02-20T08:30',
        confirmed_at: '2026-02-20T08:35',
        supplier_contacted_at: '2026-02-20T08:40',
        supplier_committed_at: '2026-02-20T09:00',
        out_for_delivery_at: '2026-02-20T10:30'
      },
      payment_type: 'cod',
      payment_due_date: '2026-02-20',
      payment_status: 'pending',
      worker_assigned_id: 'W001',
      notes: '',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD002',
      customer_id: 'C002',
      status: 'supplier_committed',
      products: [
        { product_id: 'P002', quantity: 2, unit: 'Brass', quoted_price: 3800, floor_price: 3200, margin: 600, supplier_id: 'S001', supplier_committed_time: '14:00', delivery_status: 'confirmed' },
        { product_id: 'P003', quantity: 1, unit: 'Brass', quoted_price: 3200, floor_price: 2800, margin: 400, supplier_id: 'S001', supplier_committed_time: '14:00', delivery_status: 'confirmed' }
      ],
      delivery_address: 'Tower B, Palasia Square, Indore',
      delivery_deadline_agreed: '2026-02-20T15:00',
      delivery_actual_time: null,
      total_amount: 10800,
      pipeline_timestamps: {
        created_at: '2026-02-20T09:15',
        confirmed_at: '2026-02-20T09:20',
        supplier_contacted_at: '2026-02-20T09:30',
        supplier_committed_at: '2026-02-20T10:00'
      },
      payment_type: 'credit',
      payment_due_date: '2026-02-27',
      payment_status: 'pending',
      worker_assigned_id: null,
      notes: 'Customer has outstanding ₹24,500',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD003',
      customer_id: 'C003',
      status: 'confirmed',
      products: [
        { product_id: 'P001', quantity: 20, unit: 'Bags', quoted_price: 370, floor_price: 340, margin: 30, supplier_id: null, supplier_committed_time: null, delivery_status: 'pending' }
      ],
      delivery_address: 'Plot 45, Bhawarkuan, Indore',
      delivery_deadline_agreed: '2026-02-20T16:00',
      delivery_actual_time: null,
      total_amount: 7400,
      pipeline_timestamps: {
        created_at: '2026-02-20T10:00',
        confirmed_at: '2026-02-20T10:05'
      },
      payment_type: 'cod',
      payment_due_date: '2026-02-20',
      payment_status: 'pending',
      worker_assigned_id: null,
      notes: '',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD004',
      customer_id: 'C005',
      status: 'payment_pending',
      products: [
        { product_id: 'P004', quantity: 5000, unit: 'Pieces', quoted_price: 8, floor_price: 6, margin: 2, supplier_id: 'S003', supplier_committed_time: null, delivery_status: 'delivered' },
        { product_id: 'P001', quantity: 30, unit: 'Bags', quoted_price: 370, floor_price: 340, margin: 30, supplier_id: 'S004', supplier_committed_time: null, delivery_status: 'delivered' }
      ],
      delivery_address: 'Scheme 54, Block C, Indore',
      delivery_deadline_agreed: '2026-02-18T14:00',
      delivery_actual_time: '2026-02-18T15:30',
      total_amount: 51100,
      pipeline_timestamps: {
        created_at: '2026-02-17T11:00',
        confirmed_at: '2026-02-17T11:15',
        supplier_contacted_at: '2026-02-17T11:30',
        supplier_committed_at: '2026-02-17T12:00',
        out_for_delivery_at: '2026-02-18T10:00',
        delivered_at: '2026-02-18T15:30'
      },
      payment_type: 'credit',
      payment_due_date: '2026-02-20',
      payment_status: 'overdue',
      worker_assigned_id: 'W003',
      notes: 'Delivery was 1.5 hrs late',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD005',
      customer_id: 'C006',
      status: 'delivered',
      products: [
        { product_id: 'P002', quantity: 1, unit: 'Brass', quoted_price: 3800, floor_price: 3200, margin: 600, supplier_id: 'S002', supplier_committed_time: null, delivery_status: 'delivered' }
      ],
      delivery_address: 'MR-10, Near Bombay Hospital, Indore',
      delivery_deadline_agreed: '2026-02-19T11:00',
      delivery_actual_time: '2026-02-19T10:45',
      total_amount: 3800,
      pipeline_timestamps: {
        created_at: '2026-02-19T08:00',
        confirmed_at: '2026-02-19T08:10',
        supplier_contacted_at: '2026-02-19T08:15',
        supplier_committed_at: '2026-02-19T08:30',
        out_for_delivery_at: '2026-02-19T09:30',
        delivered_at: '2026-02-19T10:45'
      },
      payment_type: 'upi_on_delivery',
      payment_due_date: '2026-02-19',
      payment_status: 'pending',
      worker_assigned_id: 'W001',
      notes: '',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD006',
      customer_id: 'C007',
      status: 'supplier_contacted',
      products: [
        { product_id: 'P001', quantity: 100, unit: 'Bags', quoted_price: 365, floor_price: 340, margin: 25, supplier_id: 'S004', supplier_committed_time: null, delivery_status: 'pending' },
        { product_id: 'P003', quantity: 3, unit: 'Brass', quoted_price: 3100, floor_price: 2800, margin: 300, supplier_id: 'S001', supplier_committed_time: null, delivery_status: 'pending' }
      ],
      delivery_address: 'AB Road, Treasure Town, Indore',
      delivery_deadline_agreed: '2026-02-21T10:00',
      delivery_actual_time: null,
      total_amount: 45800,
      pipeline_timestamps: {
        created_at: '2026-02-20T09:00',
        confirmed_at: '2026-02-20T09:10',
        supplier_contacted_at: '2026-02-20T09:30'
      },
      payment_type: 'partial_advance',
      payment_due_date: '2026-02-25',
      payment_status: 'partial',
      worker_assigned_id: null,
      notes: 'Advance ₹10,000 received',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD007',
      customer_id: 'C008',
      status: 'closed',
      products: [
        { product_id: 'P005', quantity: 2000, unit: 'Pieces', quoted_price: 7, floor_price: 5, margin: 2, supplier_id: 'S003', supplier_committed_time: null, delivery_status: 'delivered' }
      ],
      delivery_address: 'Sukhliya, Near Radisson, Indore',
      delivery_deadline_agreed: '2026-02-14T12:00',
      delivery_actual_time: '2026-02-14T11:30',
      total_amount: 14000,
      pipeline_timestamps: {
        created_at: '2026-02-13T14:00',
        confirmed_at: '2026-02-13T14:10',
        supplier_contacted_at: '2026-02-13T14:20',
        supplier_committed_at: '2026-02-13T15:00',
        out_for_delivery_at: '2026-02-14T09:00',
        delivered_at: '2026-02-14T11:30',
        closed_at: '2026-02-15T10:00'
      },
      payment_type: 'cod',
      payment_due_date: '2026-02-14',
      payment_status: 'collected',
      worker_assigned_id: 'W003',
      notes: '',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD008',
      customer_id: 'C001',
      status: 'inquiry',
      products: [
        { product_id: 'P002', quantity: 3, unit: 'Brass', quoted_price: 3800, floor_price: 3200, margin: 600, supplier_id: null, supplier_committed_time: null, delivery_status: 'pending' }
      ],
      delivery_address: 'Site #12, Vijay Nagar, Indore',
      delivery_deadline_agreed: '2026-02-22T10:00',
      delivery_actual_time: null,
      total_amount: 11400,
      pipeline_timestamps: {
        created_at: '2026-02-20T11:00'
      },
      payment_type: 'cod',
      payment_due_date: null,
      payment_status: 'pending',
      worker_assigned_id: null,
      notes: 'Same site as ORD001',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD009',
      customer_id: 'C002',
      status: 'payment_pending',
      products: [
        { product_id: 'P001', quantity: 80, unit: 'Bags', quoted_price: 370, floor_price: 340, margin: 30, supplier_id: 'S004', supplier_committed_time: null, delivery_status: 'delivered' }
      ],
      delivery_address: 'Tower A, Palasia Square, Indore',
      delivery_deadline_agreed: '2026-02-12T14:00',
      delivery_actual_time: '2026-02-12T13:45',
      total_amount: 29600,
      pipeline_timestamps: {
        created_at: '2026-02-11T09:00',
        confirmed_at: '2026-02-11T09:15',
        supplier_contacted_at: '2026-02-11T09:30',
        supplier_committed_at: '2026-02-11T10:00',
        out_for_delivery_at: '2026-02-12T11:00',
        delivered_at: '2026-02-12T13:45'
      },
      payment_type: 'credit',
      payment_due_date: '2026-02-18',
      payment_status: 'overdue',
      worker_assigned_id: 'W001',
      notes: 'Part of Palasia project',
      created_by: 'nephew'
    },
    {
      order_id: 'ORD010',
      customer_id: 'C006',
      status: 'confirmed',
      products: [
        { product_id: 'P005', quantity: 3000, unit: 'Pieces', quoted_price: 7, floor_price: 5, margin: 2, supplier_id: null, supplier_committed_time: null, delivery_status: 'pending' }
      ],
      delivery_address: 'MR-10, Sector D, Indore',
      delivery_deadline_agreed: '2026-02-21T14:00',
      delivery_actual_time: null,
      total_amount: 21000,
      pipeline_timestamps: {
        created_at: '2026-02-20T10:30',
        confirmed_at: '2026-02-20T10:35'
      },
      payment_type: 'cod',
      payment_due_date: '2026-02-21',
      payment_status: 'pending',
      worker_assigned_id: null,
      notes: '',
      created_by: 'nephew'
    }
  ],

  // ─── COLLECTION TASKS ─────────────────────────────────
  collectionTasks: [
    {
      collection_task_id: 'CT001',
      order_id: 'ORD001',
      customer_id: 'C001',
      amount_total: 18500,
      amount_collected: 0,
      amount_pending: 18500,
      scheduled_date: '2026-02-20',
      collection_method: 'cod',
      status: 'scheduled',
      assigned_to: 'nephew',
      notes: 'Cash on delivery - Ramsingh collecting'
    },
    {
      collection_task_id: 'CT002',
      order_id: 'ORD004',
      customer_id: 'C005',
      amount_total: 51100,
      amount_collected: 0,
      amount_pending: 51100,
      scheduled_date: '2026-02-20',
      collection_method: 'specific_date',
      status: 'overdue',
      assigned_to: 'nephew',
      notes: 'Credit expired, customer not responding'
    },
    {
      collection_task_id: 'CT003',
      order_id: 'ORD009',
      customer_id: 'C002',
      amount_total: 29600,
      amount_collected: 0,
      amount_pending: 29600,
      scheduled_date: '2026-02-18',
      collection_method: 'specific_date',
      status: 'overdue',
      assigned_to: 'father',
      notes: '2 days overdue'
    },
    {
      collection_task_id: 'CT004',
      order_id: 'ORD005',
      customer_id: 'C006',
      amount_total: 3800,
      amount_collected: 0,
      amount_pending: 3800,
      scheduled_date: '2026-02-19',
      collection_method: 'upi',
      status: 'overdue',
      assigned_to: 'nephew',
      notes: 'UPI pending since yesterday'
    },
    {
      collection_task_id: 'CT005',
      order_id: 'ORD002',
      customer_id: 'C002',
      amount_total: 10800,
      amount_collected: 0,
      amount_pending: 10800,
      scheduled_date: '2026-02-27',
      collection_method: 'specific_date',
      status: 'scheduled',
      assigned_to: 'nephew',
      notes: '7 day credit'
    },
    {
      collection_task_id: 'CT006',
      order_id: 'ORD006',
      customer_id: 'C007',
      amount_total: 35800,
      amount_collected: 10000,
      amount_pending: 25800,
      scheduled_date: '2026-02-25',
      collection_method: 'advance_balance',
      status: 'partial',
      assigned_to: 'nephew',
      notes: 'Balance after advance ₹10,000'
    },
    {
      collection_task_id: 'CT007',
      order_id: 'ORD007',
      customer_id: 'C008',
      amount_total: 14000,
      amount_collected: 14000,
      amount_pending: 0,
      scheduled_date: '2026-02-14',
      collection_method: 'cod',
      status: 'collected',
      assigned_to: 'nephew',
      notes: 'Collected by Bhura'
    }
  ],

  // ─── SUPPLIER PAYMENTS ────────────────────────────────
  supplierPayments: [
    {
      supplier_payment_id: 'SP001',
      supplier_id: 'S001',
      order_id: 'ORD002',
      amount_total: 9800,
      amount_paid: 0,
      amount_pending: 9800,
      payment_due_date: '2026-02-20',
      payment_method: 'cash',
      payment_timing: 'cod',
      status: 'scheduled',
      assigned_to: 'nephew',
      notes: 'Pay on delivery'
    },
    {
      supplier_payment_id: 'SP002',
      supplier_id: 'S004',
      order_id: 'ORD006',
      amount_total: 33000,
      amount_paid: 0,
      amount_pending: 33000,
      payment_due_date: '2026-02-23',
      payment_method: 'bank_transfer',
      payment_timing: 'credit',
      status: 'scheduled',
      assigned_to: 'nephew',
      notes: '3 day credit from Gupta'
    },
    {
      supplier_payment_id: 'SP003',
      supplier_id: 'S003',
      order_id: 'ORD010',
      amount_total: 16500,
      amount_paid: 0,
      amount_pending: 16500,
      payment_due_date: '2026-02-20',
      payment_method: 'cash',
      payment_timing: 'before_dispatch',
      status: 'reminded',
      assigned_to: 'father',
      notes: 'Must pay before they load!'
    },
    {
      supplier_payment_id: 'SP004',
      supplier_id: 'S002',
      order_id: 'ORD005',
      amount_total: 3200,
      amount_paid: 3200,
      amount_pending: 0,
      payment_due_date: '2026-02-26',
      payment_method: 'upi',
      payment_timing: 'credit',
      status: 'paid',
      assigned_to: 'nephew',
      notes: 'Paid via UPI'
    }
  ],

  // ─── WORKER ASSIGNMENTS ───────────────────────────────
  workerAssignments: [
    {
      assignment_id: 'WA001',
      worker_id: 'W001',
      type: 'delivery',
      order_id: 'ORD001',
      assigned_by: 'father',
      assigned_at: '2026-02-20T10:00',
      expected_return_time: '2026-02-20T13:00',
      actual_return_time: null,
      expected_amount: 18500,
      collected_amount: null,
      status: 'in_progress',
      notes: 'Cement delivery to Vijay Nagar'
    },
    {
      assignment_id: 'WA002',
      worker_id: 'W004',
      type: 'task',
      order_id: null,
      task_id: 'T001',
      assigned_by: 'father',
      assigned_at: '2026-02-20T08:30',
      expected_return_time: '2026-02-20T09:30',
      actual_return_time: '2026-02-20T09:15',
      expected_amount: null,
      collected_amount: null,
      status: 'completed',
      notes: 'Shop cleaning'
    }
  ],

  // ─── INVENTORY ────────────────────────────────────────
  inventory: [
    {
      inventory_id: 'INV001',
      product_id: 'P001',
      product_name: 'Cement (ACC/Ambuja)',
      current_stock: 120,
      unit: 'Bags',
      reorder_threshold: 50,
      last_updated_at: '2026-02-20T08:00',
      last_updated_by: 'father',
      incoming: 100,
      incoming_expected: '2026-02-21T10:00',
      committed: 50
    }
  ],

  inventoryLog: [
    { log_id: 'IL001', product_id: 'P001', change_amount: 200, reason: 'received', order_id: null, recorded_by: 'nephew', recorded_at: '2026-02-18T09:00', notes: 'New stock from Gupta' },
    { log_id: 'IL002', product_id: 'P001', change_amount: -50, reason: 'sold', order_id: 'ORD001', recorded_by: 'nephew', recorded_at: '2026-02-20T08:30', notes: 'Rajesh Sharma order' },
    { log_id: 'IL003', product_id: 'P001', change_amount: -20, reason: 'sold', order_id: 'ORD003', recorded_by: 'nephew', recorded_at: '2026-02-20T10:00', notes: 'Amit Verma order' },
    { log_id: 'IL004', product_id: 'P001', change_amount: -5, reason: 'damaged', order_id: null, recorded_by: 'father', recorded_at: '2026-02-19T17:00', notes: 'Water damage' },
    { log_id: 'IL005', product_id: 'P001', change_amount: -3, reason: 'count_correction', order_id: null, recorded_by: 'father', recorded_at: '2026-02-19T18:00', notes: 'Evening count mismatch' }
  ],

  // ─── TASKS ────────────────────────────────────────────
  taskTemplates: [
    { template_id: 'TT001', name: 'Diesel bharo (vehicle)', nameHi: 'डीजल भरो (गाड़ी)', default_reminder_time: '08:00', default_assigned_to: 'worker', is_active: true, sort_order: 1 },
    { template_id: 'TT002', name: 'Bijli bill bharo', nameHi: 'बिजली बिल भरो', default_reminder_time: '09:00', default_assigned_to: 'nephew', is_active: true, sort_order: 2 },
    { template_id: 'TT003', name: 'Shop saaf karo', nameHi: 'दुकान साफ करो', default_reminder_time: '08:00', default_assigned_to: 'worker', is_active: true, sort_order: 3 },
    { template_id: 'TT004', name: 'Maal check karo', nameHi: 'माल चेक करो (inventory)', default_reminder_time: '18:00', default_assigned_to: 'father', is_active: true, sort_order: 4 },
    { template_id: 'TT005', name: 'Vehicle service check', nameHi: 'गाड़ी सर्विस चेक', default_reminder_time: '08:00', default_assigned_to: 'nephew', is_active: true, sort_order: 5 },
    { template_id: 'TT006', name: 'Municipal tax', nameHi: 'नगर निगम टैक्स', default_reminder_time: '10:00', default_assigned_to: 'nephew', is_active: false, sort_order: 6 }
  ],

  tasks: [
    {
      task_id: 'T001',
      template_id: 'TT003',
      title: 'Shop saaf karo',
      titleHi: 'दुकान साफ करो',
      description: 'Morning cleaning',
      due_date: '2026-02-20',
      due_time: '08:30',
      assigned_to: 'W004',
      assigned_to_name: 'Sonu',
      priority: 'normal',
      status: 'done',
      recurrence: 'daily',
      created_by: 'father',
      created_at: '2026-02-20T07:00',
      completed_at: '2026-02-20T09:15',
      completion_note: ''
    },
    {
      task_id: 'T002',
      template_id: 'TT004',
      title: 'Maal check karo',
      titleHi: 'माल चेक करो',
      description: 'Evening inventory count',
      due_date: '2026-02-20',
      due_time: '18:00',
      assigned_to: 'father',
      assigned_to_name: 'Papa',
      priority: 'normal',
      status: 'pending',
      recurrence: 'daily',
      created_by: 'father',
      created_at: '2026-02-20T07:00',
      completed_at: null,
      completion_note: ''
    },
    {
      task_id: 'T003',
      template_id: null,
      title: 'Sunil ka payment follow up',
      titleHi: 'सुनील का पेमेंट फॉलो अप',
      description: '₹24,500 overdue. Call and remind.',
      due_date: '2026-02-20',
      due_time: '11:00',
      assigned_to: 'nephew',
      assigned_to_name: 'Nephew',
      priority: 'high',
      status: 'pending',
      recurrence: 'none',
      created_by: 'father',
      created_at: '2026-02-19T19:00',
      completed_at: null,
      completion_note: ''
    },
    {
      task_id: 'T004',
      template_id: 'TT001',
      title: 'Diesel bharo',
      titleHi: 'डीजल भरो',
      description: 'Vehicle tank half empty',
      due_date: '2026-02-20',
      due_time: '09:00',
      assigned_to: 'nephew',
      assigned_to_name: 'Nephew',
      priority: 'normal',
      status: 'done',
      recurrence: 'none',
      created_by: 'father',
      created_at: '2026-02-20T07:00',
      completed_at: '2026-02-20T09:30',
      completion_note: '₹1500 diesel bharwaya'
    },
    {
      task_id: 'T005',
      template_id: null,
      title: 'Raj Suppliers ko call karo',
      titleHi: 'राज सप्लायर्स को कॉल करो',
      description: 'Check fly ash brick quality for next order',
      due_date: '2026-02-21',
      due_time: '10:00',
      assigned_to: 'nephew',
      assigned_to_name: 'Nephew',
      priority: 'normal',
      status: 'pending',
      recurrence: 'none',
      created_by: 'father',
      created_at: '2026-02-20T08:00',
      completed_at: null,
      completion_note: ''
    },
    {
      task_id: 'T006',
      template_id: 'TT002',
      title: 'Bijli bill bharo',
      titleHi: 'बिजली बिल भरो',
      description: 'Electricity bill due this week',
      due_date: '2026-02-19',
      due_time: '10:00',
      assigned_to: 'nephew',
      assigned_to_name: 'Nephew',
      priority: 'high',
      status: 'pending',
      recurrence: 'none',
      created_by: 'father',
      created_at: '2026-02-18T07:00',
      completed_at: null,
      completion_note: ''
    }
  ],

  // ─── CALL RECORDINGS ─────────────────────────────────
  callRecordings: [
    {
      call_id: 'CALL001',
      type: 'supplier',
      contact_id: 'S001',
      contact_name: 'Sharma Traders (Ramesh)',
      order_id: 'ORD002',
      call_datetime: '2026-02-20T09:35',
      duration_seconds: 180,
      summary_text: 'Sand 2 brass aur gitti 1 brass chahiye. Rate ₹3,400/brass sand, ₹2,900/brass gitti. Delivery 2 baje tak ho jayegi. Payment delivery pe.',
      extracted_entities: {
        product: 'Sand + Gitti',
        price_sand: 3400,
        price_gitti: 2900,
        delivery_time: '14:00',
        conditions: 'Payment on delivery'
      },
      confirmed_by_nephew: true,
      confirmed_at: '2026-02-20T09:42',
      corrections_made: null
    },
    {
      call_id: 'CALL002',
      type: 'customer',
      contact_id: 'C001',
      contact_name: 'Rajesh Sharma',
      order_id: 'ORD001',
      call_datetime: '2026-02-20T08:25',
      duration_seconds: 120,
      summary_text: 'Rajesh ko 50 bag cement chahiye, Vijay Nagar site pe. 12 baje tak chahiye. COD karega.',
      extracted_entities: {
        product: 'Cement',
        quantity: 50,
        delivery_address: 'Vijay Nagar',
        delivery_time: '12:00',
        payment: 'COD'
      },
      confirmed_by_nephew: true,
      confirmed_at: '2026-02-20T08:30',
      corrections_made: null
    },
    {
      call_id: 'CALL003',
      type: 'supplier',
      contact_id: 'S004',
      contact_name: 'Gupta Cement Depot (Anil)',
      order_id: 'ORD006',
      call_datetime: '2026-02-20T09:32',
      duration_seconds: 150,
      summary_text: '100 bag cement chahiye. Rate ₹330/bag. Kal subah 10 baje tak bhej denge. Credit 3 din.',
      extracted_entities: {
        product: 'Cement',
        quantity: 100,
        price: 330,
        delivery_time: 'Tomorrow 10:00',
        payment: 'Credit 3 days'
      },
      confirmed_by_nephew: false,
      confirmed_at: null,
      corrections_made: null
    },
    {
      call_id: 'CALL004',
      type: 'customer',
      contact_id: 'C005',
      contact_name: 'Mahesh Joshi',
      order_id: 'ORD004',
      call_datetime: '2026-02-19T16:00',
      duration_seconds: 90,
      summary_text: 'Payment follow up call. Mahesh bol raha hai 2 din mein de dega. Phone nahi utha raha tha pehle.',
      extracted_entities: {
        payment_commitment: '2 days',
        reason_for_delay: 'Was not picking up phone'
      },
      confirmed_by_nephew: true,
      confirmed_at: '2026-02-19T16:05',
      corrections_made: 'He said 3 days not 2'
    }
  ],

  // ─── LOST DEALS ───────────────────────────────────────
  lostDeals: [
    {
      lost_deal_id: 'LD001',
      customer_id: 'C004',
      customer_name: 'Priya Singh',
      products_requested: ['Cement'],
      quantities: [30],
      loss_reason: 'price',
      competitor_name: 'Balaji Building Materials',
      competitor_price: 350,
      our_quoted_price: 370,
      created_at: '2026-02-18T14:00'
    },
    {
      lost_deal_id: 'LD002',
      customer_id: null,
      customer_name: 'Walk-in customer',
      products_requested: ['Sand'],
      quantities: [2],
      loss_reason: 'delivery',
      competitor_name: null,
      competitor_price: null,
      our_quoted_price: 3800,
      created_at: '2026-02-17T11:00'
    },
    {
      lost_deal_id: 'LD003',
      customer_id: null,
      customer_name: 'Phone inquiry',
      products_requested: ['Bricks', 'Cement'],
      quantities: [5000, 50],
      loss_reason: 'competitor',
      competitor_name: 'Shree Ganesh Materials, Dewas Naka',
      competitor_price: null,
      our_quoted_price: null,
      created_at: '2026-02-16T09:30'
    }
  ],

  // ─── ESCALATION RULES ────────────────────────────────
  escalationRules: [
    { id: 'ER001', condition: 'Order value > ₹50,000', conditionHi: 'ऑर्डर ₹50,000 से ज़्यादा', threshold: 50000, action: 'Alert owner before confirmation', is_active: true },
    { id: 'ER002', condition: 'New customer first order > ₹20,000', conditionHi: 'नए कस्टमर का पहला ऑर्डर ₹20,000+', threshold: 20000, action: 'Alert owner', is_active: true },
    { id: 'ER003', condition: 'Collection overdue > 3 days', conditionHi: 'पेमेंट 3 दिन से ज़्यादा लेट', threshold: 3, action: 'Alert owner', is_active: true },
    { id: 'ER004', condition: 'Supplier payment overdue > 1 day', conditionHi: 'सप्लायर पेमेंट 1 दिन से लेट', threshold: 1, action: 'Alert owner', is_active: true },
    { id: 'ER005', condition: 'Cement stock < 50 bags', conditionHi: 'सीमेंट 50 बोरी से कम', threshold: 50, action: 'Alert owner + nephew', is_active: true },
    { id: 'ER006', condition: 'Nephew escalates manually', conditionHi: 'Nephew मैनुअल एस्केलेट करे', threshold: null, action: 'Immediate alert with full context', is_active: true }
  ],

  // ─── WHATSAPP TEMPLATES ───────────────────────────────
  whatsappTemplates: [
    {
      id: 'WM001',
      recipient: 'nephew',
      trigger: 'Call summary ready',
      title: 'Call Summary',
      sample: '📞 Call Summary — Sharma Traders\nSpoke with: Ramesh\n\nKey details:\n• Sand price: ₹3,400 per brass\n• Delivery time: 2 PM\n• Condition: Payment on delivery\n\n✅ Sahi hai, save karo\n✏️ Edit karo\n❌ Galat hai, ignore karo'
    },
    {
      id: 'WM002',
      recipient: 'nephew',
      trigger: 'Delivery reminder',
      title: 'Delivery Reminder',
      sample: '⏰ Delivery Reminder\nSharma Traders committed delivery to Rajesh Sharma by 12:00 PM.\n10 minutes remaining.\n📞 Call Supplier'
    },
    {
      id: 'WM003',
      recipient: 'nephew',
      trigger: 'Father worker assignment',
      title: 'Worker Assignment',
      sample: 'Papa ka message: Ramsingh ko kaam pe lagaya hai.\nKaam: Delivery\nCustomer: Rajesh Sharma | Vijay Nagar\nProducts: Cement 50 bags\nExpected time: 1:00 PM\nJab complete ho, confirm karna.'
    },
    {
      id: 'WM004',
      recipient: 'nephew',
      trigger: 'Father payment reminder',
      title: 'Payment Collection',
      sample: 'Papa ka message: Mahesh Joshi ka ₹51,100 collect karna hai.\nDue: 20 Feb (आज)\nPhone: 9090909090\nOrder: Bricks 5000 + Cement 30 bags\nPlease call karo aur update karo.'
    },
    {
      id: 'WM005',
      recipient: 'nephew',
      trigger: 'Father general reminder',
      title: 'General Reminder',
      sample: 'Papa ka message: Please check karo — 11:30 AM'
    },
    {
      id: 'WM006',
      recipient: 'father',
      trigger: 'Morning summary',
      title: 'Morning Summary (9 AM)',
      sample: '🌅 Subah ki Summary — 20 Feb 2026\n\nOrders today: 3\nCollections due: ₹69,600\nWorkers present: 3/4\n\nAttention:\n🔴 Mahesh Joshi ₹51,100 overdue\n🔴 Sunil Patel ₹29,600 overdue (2 days)\n🟡 Raj Suppliers payment before dispatch ₹16,500'
    },
    {
      id: 'WM007',
      recipient: 'father',
      trigger: 'Collection overdue',
      title: 'Collection Overdue',
      sample: '🔴 Payment Overdue\nCustomer: Sunil Patel\nAmount: ₹29,600\nDays overdue: 2\nOrder: Cement 80 bags (Palasia)\n\nCall karo ya Nephew ko bhejo?'
    },
    {
      id: 'WM008',
      recipient: 'father',
      trigger: 'Evening summary',
      title: 'Evening Summary (7 PM)',
      sample: '🌙 Shaam ki Summary — 20 Feb 2026\n\nOrders completed: 2\nCollections done: ₹18,500\nPending collections: ₹84,500\nWorkers: All returned\n\nKal ke liye:\n• 2 deliveries pending\n• ₹51,100 collection follow-up'
    },
    {
      id: 'WM009',
      recipient: 'owner',
      trigger: 'Escalation',
      title: 'Escalation Alert',
      sample: '🚨 Escalation — Large Order\nCustomer: Ravi Malhotra (Builder)\nOrder value: ₹45,800\nProducts: Cement 100 bags + Gitti 3 brass\nPayment: Partial advance (₹10,000 received)\n\nOutstanding from this customer: ₹18,000\n\nAction needed: Approve or modify terms'
    },
    {
      id: 'WM010',
      recipient: 'owner',
      trigger: 'Weekly summary',
      title: 'Weekly Summary (Sunday)',
      sample: '📊 Weekly Summary — Week of 14-20 Feb 2026\n\nOrders: 8 (₹2,12,600)\nDeliveries completed: 6\nCollections: ₹78,400\nPending receivables: ₹1,03,900\nSupplier payments: ₹52,500\n\nTop customer: Ravi Malhotra (₹45,800)\nLost deals: 3 (₹35,200)\nMost common loss reason: Price'
    },
    {
      id: 'WM011',
      recipient: 'customer',
      trigger: 'Payment reminder',
      title: 'Payment Reminder',
      sample: 'Namaskar! Nagin Nagar Building Materials se.\n\n₹29,600 payment 18 Feb ko due tha. Kripya payment karein.\n\nUPI: 9876543210@upi\nShop: Nagin Nagar, Indore\n\nDhanyavaad 🙏'
    }
  ],

  // ─── SUPPLIER CALL HISTORY (for detail view) ─────────
  supplierCallHistory: {
    'S001': [
      { date: '2026-02-20', time: '09:35', duration: '3:00', summary: 'Sand 2 brass + Gitti 1 brass, delivery 2 PM, COD', price: { P002: 3400, P003: 2900 } },
      { date: '2026-02-18', time: '10:15', duration: '2:30', summary: 'Price inquiry - Sand ₹3,400, Gitti ₹2,850. Route available near Vijay Nagar.', price: { P002: 3400, P003: 2850 } },
      { date: '2026-02-15', time: '14:20', duration: '4:10', summary: 'Sand 3 brass order for Sunil Patel. Delivery took 2 hours instead of 90 min.', price: { P002: 3350 } },
      { date: '2026-02-10', time: '09:00', duration: '1:45', summary: 'Checking availability. Sand available, gitti low stock.', price: { P002: 3300, P003: 2900 } }
    ],
    'S002': [
      { date: '2026-02-19', time: '08:15', duration: '2:00', summary: 'Sand 1 brass for Dinesh Kumar. Premium quality. Delivery in 2 hours. Credit 7 days.', price: { P002: 3500 } },
      { date: '2026-02-14', time: '11:00', duration: '3:30', summary: 'Bulk inquiry - Sand 5 brass. Can do ₹3,400 for 5+. Delivery next day.', price: { P002: 3400 } }
    ],
    'S003': [
      { date: '2026-02-13', time: '14:20', duration: '2:15', summary: 'Fly ash bricks 2000 pcs. ₹5.5/pc. Delivery 2 hours. Payment before dispatch.', price: { P005: 5.5 } },
      { date: '2026-02-08', time: '10:00', duration: '1:30', summary: 'Bricks inquiry. Regular ₹6.5/pc, fly ash ₹5.5/pc. Quality good this batch.', price: { P004: 6.5, P005: 5.5 } }
    ],
    'S004': [
      { date: '2026-02-20', time: '09:32', duration: '2:30', summary: '100 bags cement. ₹330/bag. Tomorrow 10 AM delivery. 3 day credit.', price: { P001: 330 } },
      { date: '2026-02-18', time: '08:45', duration: '1:00', summary: '50 bags cement for today delivery. ₹330/bag. Delivered in 45 min.', price: { P001: 330 } },
      { date: '2026-02-15', time: '09:00', duration: '2:00', summary: 'Stock check. ACC available, Ambuja short supply. Price same ₹330.', price: { P001: 330 } }
    ]
  },

  // ─── SUPPLIER PRICE HISTORY (for charts) ──────────────
  supplierPriceHistory: {
    'S001': {
      P002: [
        { date: '2026-01-05', price: 3200 },
        { date: '2026-01-15', price: 3250 },
        { date: '2026-01-25', price: 3300 },
        { date: '2026-02-05', price: 3300 },
        { date: '2026-02-10', price: 3300 },
        { date: '2026-02-15', price: 3350 },
        { date: '2026-02-18', price: 3400 },
        { date: '2026-02-20', price: 3400 }
      ],
      P003: [
        { date: '2026-01-05', price: 2700 },
        { date: '2026-01-20', price: 2750 },
        { date: '2026-02-01', price: 2800 },
        { date: '2026-02-10', price: 2900 },
        { date: '2026-02-18', price: 2850 },
        { date: '2026-02-20', price: 2900 }
      ]
    },
    'S004': {
      P001: [
        { date: '2026-01-01', price: 320 },
        { date: '2026-01-15', price: 325 },
        { date: '2026-02-01', price: 328 },
        { date: '2026-02-10', price: 330 },
        { date: '2026-02-20', price: 330 }
      ]
    }
  }
};

// Helper functions
function getCustomer(id) { return AppData.customers.find(c => c.customer_id === id); }
function getCustomerByPhone(phone) { return AppData.customers.find(c => c.phone === phone); }
function getProduct(id) { return AppData.products.find(p => p.product_id === id); }
function getSupplier(id) { return AppData.suppliers.find(s => s.supplier_id === id); }
function getWorker(id) { return AppData.workers.find(w => w.worker_id === id); }
function getOrder(id) { return AppData.orders.find(o => o.order_id === id); }
function getOrdersForCustomer(cid) { return AppData.orders.filter(o => o.customer_id === cid); }
function getOrdersForSupplier(sid) { return AppData.orders.filter(o => o.products.some(p => p.supplier_id === sid)); }
function getActiveOrders() { return AppData.orders.filter(o => !['closed', 'cancelled'].includes(o.status)); }
function getTodayCollections() { return AppData.collectionTasks.filter(t => t.scheduled_date === '2026-02-20' && t.status !== 'collected'); }
function getOverdueCollections() { return AppData.collectionTasks.filter(t => t.status === 'overdue'); }
function isWorkerPresent(wid) { const a = AppData.attendance.find(a => a.worker_id === wid); return a && a.marked_present_at; }
function getWorkerAssignment(wid) { return AppData.workerAssignments.find(a => a.worker_id === wid && a.status === 'in_progress'); }

function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return d.getDate() + ' ' + months[d.getMonth()];
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + m + ' ' + ampm;
}

function getStatusColor(status) {
  const colors = {
    good: 'green', slow: 'yellow', problematic: 'red',
    collected: 'green', partial: 'yellow', overdue: 'red', scheduled: 'blue', reminded: 'yellow',
    pending: 'yellow', paid: 'green',
    completed: 'green', in_progress: 'blue', assigned: 'blue', done: 'green',
    inquiry: 'gray', confirmed: 'blue', supplier_contacted: 'blue', supplier_committed: 'yellow',
    out_for_delivery: 'yellow', delivered: 'green', payment_pending: 'red', closed: 'green'
  };
  return colors[status] || 'gray';
}

function getStatusLabel(status) {
  const labels = {
    inquiry: 'पूछताछ', confirmed: 'कन्फर्म', supplier_contacted: 'सप्लायर से बात',
    supplier_committed: 'सप्लायर तैयार', out_for_delivery: 'डिलीवरी में',
    delivered: 'डिलीवर हुआ', payment_pending: 'पेमेंट बाकी', closed: 'पूरा हुआ',
    cancelled: 'रद्द', scheduled: 'शेड्यूल', overdue: 'लेट', collected: 'वसूल हुआ',
    partial: 'आंशिक', reminded: 'रिमाइंडर भेजा', paid: 'भुगतान हुआ',
    pending: 'बाकी', done: 'पूरा', in_progress: 'चालू', completed: 'पूरा',
    assigned: 'असाइन', good: 'अच्छा', slow: 'धीमा', problematic: 'समस्या'
  };
  return labels[status] || status;
}

const ORDER_STAGES = ['inquiry', 'confirmed', 'supplier_contacted', 'supplier_committed', 'out_for_delivery', 'delivered', 'payment_pending', 'closed'];
const ORDER_STAGE_LABELS = {
  inquiry: 'पूछताछ', confirmed: 'कन्फर्म', supplier_contacted: 'सप्लायर से बात',
  supplier_committed: 'सप्लायर तैयार', out_for_delivery: 'डिलीवरी में',
  delivered: 'डिलीवर', payment_pending: 'पेमेंट बाकी', closed: 'पूरा'
};
