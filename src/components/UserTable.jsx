
import { useState } from "react";
import { Input, Table, Tag, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function UserTable({ users }) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role, user.status]
      .some((value) => value.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "default"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search users..."
        allowClear
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredUsers}
        scroll={{ x: 600 }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showTotal: (total) => `Total ${total} users`,
        }}
      />
    </Space>
  );
}
export default UserTable;
