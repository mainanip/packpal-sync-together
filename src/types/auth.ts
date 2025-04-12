
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
}
