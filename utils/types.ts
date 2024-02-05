export type LegalType = {
  created_at: string;
  description: string;
  description_unfiltered: string;
  heading: string;
  id: number;
  is_active: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  page_name: string;
  slug: string;
  updated_at: string;
};

export type CourseType = {
  created: string;
  created_at: string;
  class: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  heading: string;
  image: string;
  image_alt: string;
  image_title: string;
  id: number;
  is_active: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated_at: string;
  updated: string;
};

export type BranchType = {
  created: string;
  created_at: string;
  name: string;
  id: number;
  is_active: boolean;
  slug: string;
  updated: string;
  updated_at: string;
  courses: CourseType[];
};

export type AchieverCategory = {
  created_at: string;
  description: string;
  heading: string;
  id: number;
  is_active: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated_at: string;
};

export type ShortBranchType = {
  created: string;
  created_at: string;
  name: string;
  id: number;
  is_active: boolean;
  slug: string;
  updated: string;
  updated_at: string;
};

export type ShortCourseType = {
  created: string;
  created_at: string;
  class: string;
  short_description: string;
  image: string;
  image_alt: string;
  image_title: string;
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  updated: string;
  branches: ShortBranchType[];
};

export type FaqType = {
  created_at: string;
  answer: string;
  answer_unfiltered: string;
  id: number;
  is_active: boolean;
  question: string;
  updated_at: string;
};

export type TestimonialType = {
  created_at: string;
  designation: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  star: number;
  name: string;
  message: string;
  updated_at: string;
}

export type JobOpeningType = {
  created_at: string;
  created: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  id: number;
  name: string;
  updated_at: string;
  updated: string;
}

export type ExpertTipType = {
  author_name: string;
  created_at: string;
  created: string;
  heading: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  id: number;
  is_active: boolean;
  is_popular: boolean;
  is_updated: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated: string;
  updated_at: string;
  published: string;
  published_on: string;
}

export type EventSpecificationType = {
  created_at: string;
  title: string;
  description: string;
  id: number;
  updated_at: string;
}

export type EventSpeakerType = {
  created_at: string;
  name: string;
  designation: string;
  qualification: string;
  image: string;
  image_alt: string;
  image_title: string;
  id: number;
  updated_at: string;
}

export type EventType = {
  created_at: string;
  created: string;
  event_date: string;
  event_date_on: string;
  heading: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated: string;
  updated_at: string;
  speakers: EventSpeakerType[];
  specifications: EventSpecificationType[];
}

export type BlogType = {
  author_name: string;
  created_at: string;
  created: string;
  heading: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  is_popular: boolean;
  is_updated: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated: string;
  updated_at: string;
  published: string;
  published_on: string;
}

export type BlogCommentType = {
  created_at: string;
  email: string;
  comment: string;
  id: number;
  name: string;
  comment_on: string;
  updated_at: string;
}

export type AchieverCategoryType = {
  created_at: string;
  heading: string;
  description: string;
  id: number;
  is_active: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated_at: string;
}

export type AchieverStudentType = {
  categories: AchieverCategoryType[];
  created_at: string;
  college: string;
  id: number;
  is_active: boolean;
  image: string;
  image_alt: string;
  image_title: string;
  name: string;
  rank: string;
  updated_at: string;
}

export type CounterType = {
  created_at: string;
  counter: number;
  id: number;
  is_active: boolean;
  image: string;
  image_alt: string;
  image_title: string;
  title: string;
  updated_at: string;
}

export type FeatureType = {
  created_at: string;
  description: string;
  id: number;
  is_active: boolean;
  image: string;
  title: string;
  updated_at: string;
}

export type SeoType = {
  created_at: string;
  id: number;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  page_name: string;
  slug: string;
  updated_at: string;
}

export type AboutType = {
  created_at: string;
  counter_description: string;
  counter_image: string;
  counter_title: string;
  description: string;
  description_unfiltered: string;
  heading: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  title: string;
  page: string;
  updated_at: string;
}

export type ManagementType = {
  created_at: string;
  description: string;
  description_unfiltered: string;
  designation: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  name: string;
  qualification: string;
  updated_at: string;
}

export type StaffType = {
  created_at: string;
  description: string;
  designation: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  name: string;
  qualification: string;
  updated_at: string;
}

export type GalleryType = {
  created_at: string;
  description: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  title: string;
  updated_at: string;
}

export type CampaignType = {
  achievers: AchieverStudentType[];
  created_at: string;
  created: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  form_heading: string;
  heading: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  is_active: boolean;
  include_form: boolean;
  include_testimonial: boolean;
  include_topper: boolean;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  testimonial_heading: string;
  topper_heading: string;
  testimonials: TestimonialType[];
  updated: string;
  updated_at: string;
  published: string;
  published_on: string;
}

export type BannerType = {
  created_at: string;
  banner_image: string;
  banner_image_alt: string;
  banner_image_title: string;
  button_link: string;
  button_text: string;
  counter_description_1: string;
  counter_description_2: string;
  counter_title_1: string;
  counter_title_2: string;
  counter_image_1: string;
  counter_image_2: string;
  id: number;
  is_active: boolean;
  title: string;
  heading: string;
  description: string;
  updated_at: string;
}

export type ProfileType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  verified: string;
  roles: string[];
}

export type CourseSliderType = {
  created_at: string;
  created: string;
  short_description: string;
  class: string;
  id: number;
  image: string;
  image_alt: string;
  image_title: string;
  name: string;
  slug: string;
  updated: string;
  updated_at: string;
  branches: {
    created: string;
    created_at: string;
    name: string;
    id: number;
    is_active: boolean;
    slug: string;
    updated: string;
    updated_at: string;
  }[]
}

export type CourseDetailType = {
  course: {
    created: string;
    created_at: string;
    class: string;
    description: string;
    description_unfiltered: string;
    short_description: string;
    image: string;
    image_alt: string;
    image_title: string;
    id: number;
    is_active: boolean;
    meta_description: string;
    meta_keywords: string | null;
    meta_scripts: string | null;
    meta_title: string;
    name: string;
    slug: string;
    updated_at: string;
    updated: string;
    branch_details: {
      achievers: AchieverStudentType[];
      amount: number;
      created_at: string;
      created: string;
      description: string;
      description_unfiltered: string;
      short_description: string;
      discount: number;
      discounted_amount: number;
      staff_heading: string;
      id: number;
      image: string;
      image_alt: string;
      image_title: string;
      include_staff: boolean;
      include_testimonial: boolean;
      include_topper: boolean;
      meta_description: string;
      meta_keywords: string | null;
      meta_scripts: string | null;
      meta_title: string;
      testimonial_heading: string;
      topper_heading: string;
      testimonials: TestimonialType[];
      staffs: StaffType[];
      updated: string;
      updated_at: string;
    }[]
  };
  branch: BranchType;
};

export type OnlineTestType = {
  amount: number | null;
  created: string;
  created_at: string;
  description: string;
  description_unfiltered: string;
  short_description: string;
  id: number;
  is_active: boolean;
  is_paid: boolean;
  image: string;
  image_alt: string;
  image_title: string;
  meta_description: string;
  meta_keywords: string | null;
  meta_scripts: string | null;
  meta_title: string;
  name: string;
  slug: string;
  updated_at: string;
  updated: string;
  is_test_enrolled: {
    amount:string;
    created_at:string;
    current_question_id:number;
    current_quiz_id:number;
    enrollment_type:string;
    id:number;
    is_enrolled:boolean;
    payment_status:string;
    razorpay_order_id:string|null;
    reason:string|null;
    receipt:string|null;
    test_id:number;
    test_status:string;
    updated_at:string;
    user_id:number;
    uuid:string;
  } | null;
}

export type OnlineTestQuestionSetType = {
  id: number;
  uuid: string;
  test_id: number;
  current_quiz: {
      id: number;
      duration: number;
      mark: number;
      negative_mark: number;
      difficulty: string;
      subject: {
          id: number;
          name: string;
          created_at: string;
          updated_at: string
      };
      created_at: string;
      updated_at: string
  };
  current_question: {
      id: number;
      question: string;
      question_unfiltered: string;
      answer_1: string;
      answer_1_unfiltered: string;
      answer_2: string;
      answer_2_unfiltered: string;
      answer_3: string;
      answer_3_unfiltered: string;
      answer_4: string;
      answer_4_unfiltered: string;
      created_at: string;
      updated_at: string
  };
  user_id: number;
  is_enrolled: boolean;
  enrollment_type: string;
  test_status: string;
  reason: null | string;
  amount: number;
  receipt: null | string;
  razorpay_order_id: null | string;
  payment_status: string;
  created_at: string;
  updated_at: string
}

export type PaginationLinkType = {
  first: string | null;
  next: string | null;
  last: string | null;
  prev: string | null;
};

export type PaginationMetaType = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  to: number;
  total: number;
};

export type PaginationType<T> = {
  data: T[];
  links: PaginationLinkType;
  meta: PaginationMetaType;
};

interface EncryptionOptions {
  userPassword?: string;
  ownerPassword?: string;
  userPermissions?: ('print' | 'modify' | 'copy' | 'annot-forms')[];
}

export interface jsPDFOptions {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape';
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc';
  format?: string | number[];
  compress?: boolean;
  precision?: number;
  filters?: string[];
  userUnit?: number;
  encryption?: EncryptionOptions;
  putOnlyUsedFonts?: boolean;
  hotfixes?: string[];
  floatPrecision?: number | 'smart';
}
