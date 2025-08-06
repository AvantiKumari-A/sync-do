import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '@/hooks/useTasks';
import { TaskModal } from '@/components/TaskModal';
import { ArrowLeft, CircleCheck as CheckCircle, Trash2, Pin, CreditCard as Edit, Clock, Calendar } from 'lucide-react-native';
import { TaskFormData } from '@/types/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTaskById, updateTask, deleteTask, toggleTaskStatus } = useTasks();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const task = getTaskById(id!);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1E3A8A', '#1E40AF']} style={styles.gradient}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Task not found</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(task.id);
              Alert.alert('Success', 'Task deleted successfully', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleToggleStatus = async () => {
    try {
      await toggleTaskStatus(task.id);
      const newStatus = task.status === 'complete' ? 'open' : 'complete';
      Alert.alert(
        'Success', 
        `Task marked as ${newStatus === 'complete' ? 'completed' : 'open'}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update task status. Please try again.');
    }
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    Alert.alert(
      'Success', 
      isPinned ? 'Task unpinned' : 'Task pinned to top'
    );
  };

  const handleEditTask = async (taskData: TaskFormData) => {
    try {
      await updateTask(task.id, taskData);
      Alert.alert('Success', 'Task updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update task. Please try again.');
    }
  };

  const formatDateTime = (date: string, time: string) => {
    try {
      const dateObj = new Date(date);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      let dateString;
      if (dateObj.toDateString() === today.toDateString()) {
        dateString = 'Today';
      } else if (dateObj.toDateString() === tomorrow.toDateString()) {
        dateString = 'Tomorrow';
      } else {
        dateString = dateObj.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      return { dateString, time };
    } catch (error) {
      return { dateString: date, time };
    }
  };

  const { dateString, time } = formatDateTime(task.dueDate, task.time);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1E3A8A', '#1E40AF']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Details</Text>
          <TouchableOpacity onPress={() => setShowEditModal(true)}>
            <Edit size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={[styles.taskTitle, task.status === 'complete' && styles.completedText]}>
                {task.title}
              </Text>
              <View style={styles.badgeContainer}>
                {task.status === 'complete' && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>Completed</Text>
                  </View>
                )}
                {isPinned && (
                  <View style={styles.pinnedBadge}>
                    <Text style={styles.pinnedBadgeText}>Pinned</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeItem}>
                <Calendar size={16} color="#64748B" />
                <Text style={styles.dateTimeText}>{dateString}</Text>
              </View>
              <View style={styles.dateTimeItem}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.dateTimeText}>{time}</Text>
              </View>
            </View>

            {task.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{task.description}</Text>
              </View>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={handleToggleStatus}
            >
              <CheckCircle size={20} color="white" />
              <Text style={styles.actionButtonText}>
                {task.status === 'complete' ? 'Reopen' : 'Complete'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Trash2 size={20} color="white" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, isPinned ? styles.unpinButton : styles.pinButton]}
              onPress={handlePin}
            >
              <Pin size={20} color="white" />
              <Text style={styles.actionButtonText}>
                {isPinned ? 'Unpin' : 'Pin'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TaskModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditTask}
          task={task}
          title="Edit Task"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  taskHeader: {
    marginBottom: 16,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  completedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  pinnedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pinnedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  pinButton: {
    backgroundColor: '#F59E0B',
  },
  unpinButton: {
    backgroundColor: '#6B7280',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});