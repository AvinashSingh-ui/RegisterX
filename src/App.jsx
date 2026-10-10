
import { useState } from "react";
import { ConfigProvider, Card, Typography, Space } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";
import customTheme from "./theme/theme.js";
import RegistrationForm from "./components/RegistrationForm.jsx";
import UsersTable from "./components/UserTable.jsx";
import { initialUsers } from "./data/users.js";
import "./App.css";

const { Title, Text } = Typography;

export default function App() {
  const [users, setUsers] = useState(initialUsers);

  const handleRegister = (user) => {
    setUsers((prev) => [
      {
        ...user,
        id: crypto.randomUUID(),
        status: "Active",
      },
      ...prev,
    ]);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <main className="app-container">
        <Card className="register-card">
          <Space align="center" size="small">
            <Title level={2}>RegisterX</Title>
            <SafetyCertificateFilled className="brand-icon" />
          </Space>

          <Text type="secondary">Create your account</Text>
          <RegistrationForm onRegister={handleRegister} />
        </Card>

        <Card
          title="User Management"
          extra={<Text type="secondary">{users.length} users</Text>}
        >
          <UsersTable users={users} />
        </Card>
      </main>
    </ConfigProvider>
  );
}
