import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  MessageCircle, 
  FolderOpen, 
  FileText, 
  LogOut,
  ChevronRight 
} from 'lucide-react-native';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { ProfileModal } from '@/components/ProfileModal';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { profile, updateProfile } = useProfile();
  const { signOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/signin');
          },
        },
      ]
    );
  };

  const settingsOptions = [
    { 
      icon: User, 
      label: 'Profile', 
      onPress: () => setShowProfileModal(true)
    },
    { 
      icon: MessageCircle, 
      label: 'Conversations', 
      onPress: () => Alert.alert('Coming Soon', 'Conversations feature will be available soon')
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      onPress: () => Alert.alert('Coming Soon', 'Projects feature will be available soon')
    },
    { 
      icon: FileText, 
      label: 'Terms and Policies', 
      onPress: () => Alert.alert('Terms and Policies', 'Terms and Policies content would be displayed here')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#1E40AF']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={() => setShowProfileModal(true)}
          >
            <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: profile.avatar }} style={styles.largeProfileImage} />
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
        </View>

        <View style={styles.content}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={option.onPress}
            >
              <View style={styles.settingLeft}>
                <option.icon size={24} color="white" />
                <Text style={styles.settingLabel}>{option.label}</Text>
              </View>
              <ChevronRight size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ProfileModal
          visible={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onSave={async (profileData) => {
            await updateProfile(profileData);
          }}
          profile={profile}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  largeProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 40,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});