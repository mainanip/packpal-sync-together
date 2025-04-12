
export type UserRole = 'owner' | 'admin' | 'viewer' | 'member';

export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface PackingTask {
  id: string;
  name: string;
  status: 'to-pack' | 'packed' | 'delivered';
  assignee: string;
  assigneeId?: string;
  quantity: number;
  notes?: string;
  categoryId: string;
  listId: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface TaskProgress {
  total: number;
  packed: number;
  delivered: number;
  toPack: number;
  percentage: number;
}

export interface UserTask {
  userId: string;
  taskId: string;
}

// Interface for task access permissions
export interface TaskAccessControl {
  canEdit: boolean;
  canView: boolean;
  canAssign: boolean;
  canDelete: boolean;
  isOwner: boolean;
}

// Interface for packing list
export interface PackingList {
  id: string;
  title: string;
  description?: string;
  date: string;
  status: 'in-progress' | 'completed' | 'not-started';
  ownerId: string;
  createdAt: string;
  updatedAt?: string;
}

// Interface for member assignment to lists
export interface ListMember {
  listId: string;
  userId: string;
  role: 'owner' | 'member' | 'viewer';
  addedAt: string;
}

// Interface for categories in packing lists
export interface TaskCategory {
  id: string;
  name: string;
  icon: string;
  listId: string;
  createdAt: string;
}
