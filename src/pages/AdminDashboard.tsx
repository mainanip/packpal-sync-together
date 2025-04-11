
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { User, UserRole } from '@/types/auth';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, X, MoreVertical, Trash2, UserCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminDashboard = () => {
  const { user, users, approveUser, rejectUser, changeUserRole, deleteUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  const pendingUsers = users.filter(u => u.status === 'pending');
  const approvedUsers = users.filter(u => u.status === 'approved' && u.id !== user.id); // Exclude current admin
  
  const handleDelete = (userId: string) => {
    deleteUser(userId);
    setIsDeleteDialogOpen(false);
  };
  
  const renderRoleBadge = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      'owner': 'bg-purple-100 text-purple-800',
      'admin': 'bg-blue-100 text-blue-800',
      'member': 'bg-green-100 text-green-800',
      'viewer': 'bg-gray-100 text-gray-800',
    };
    
    return (
      <Badge className={colors[role]} variant="outline">
        {role}
      </Badge>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {pendingUsers.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Pending Approval</h2>
              <Table className="mb-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{renderRoleBadge(u.role)}</TableCell>
                      <TableCell>{new Date(u.createdAt || '').toLocaleDateString()}</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-green-50 hover:bg-green-100 text-green-600"
                          onClick={() => approveUser(u.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-red-50 hover:bg-red-100 text-red-600"
                          onClick={() => rejectUser(u.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{renderRoleBadge(u.role)}</TableCell>
                  <TableCell>
                    {u.status === 'approved' && (
                      <Badge className="bg-green-100 text-green-800" variant="outline">
                        Approved
                      </Badge>
                    )}
                    {u.status === 'rejected' && (
                      <Badge className="bg-red-100 text-red-800" variant="outline">
                        Rejected
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => changeUserRole(u.id, 'owner')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Make Owner</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeUserRole(u.id, 'member')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Make Member</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeUserRole(u.id, 'viewer')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Make Viewer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setSelectedUser(u);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete User</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedUser?.name}'s account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600"
              onClick={() => selectedUser && handleDelete(selectedUser.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
