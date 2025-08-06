import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Bell, Moon, Shield, Trash2 } from "lucide-react";

const SettingsView = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      {/* Notifications */}
      <Card className="p-4 bg-gradient-card border-0 shadow-task">
        <h3 className="font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Task reminders</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Timer alerts</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-4 bg-gradient-card border-0 shadow-task">
        <h3 className="font-semibold mb-4 flex items-center">
          <Moon className="w-5 h-5 mr-2 text-primary" />
          Appearance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Dark mode</span>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Account */}
      <Card className="p-4 bg-gradient-card border-0 shadow-task">
        <h3 className="font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary" />
          Account
        </h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-2xl">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-2xl text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsView;