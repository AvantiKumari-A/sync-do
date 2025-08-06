import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { SearchBar } from '@/components/SearchBar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { TaskModal } from '@/components/TaskModal';
import { useRouter, useFocusEffect } from 'expo-router';
import { TaskFormData } from '@/types/task';

export default function HomeScreen() {
  const { tasks, createTask, loadTasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  // Refresh tasks when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log('Home screen focused, refreshing tasks...');
      loadTasks();
    }, [loadTasks])
  );

  console.log('Home screen rendering with tasks:', tasks.length);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedTasks = filteredTasks.filter(task => task.status === 'complete');
  const openTasks = filteredTasks.filter(task => task.status === 'open');

  console.log('Filtered tasks:', { open: openTasks.length, completed: completedTasks.length });

  const handleCreateTask = async (taskData: TaskFormData) => {
    await createTask(taskData);
  };

  const handleTaskPress = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#1E40AF']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tasks List</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {openTasks.length === 0 && completedTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No tasks found. Create your first task!
              </Text>
            </View>
          ) : (
            <>
              {openTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() => handleTaskPress(task.id)}
                />
              ))}
              
              {completedTasks.length > 0 && (
                <>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Completed</Text>
                  </View>
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onPress={() => handleTaskPress(task.id)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>

        <FloatingActionButton onPress={() => setShowCreateModal(true)} />

        <TaskModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateTask}
          title="Create New Task"
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
});