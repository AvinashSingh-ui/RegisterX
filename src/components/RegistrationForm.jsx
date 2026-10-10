
import { Form, Input, Select, Button, Row, Col } from "antd";

function RegistrationForm({ onRegister }) {
  const [form] = Form.useForm();

  const handleSubmit = ({ confirmPassword, password, ...user }) => {
    onRegister(user);
    form.resetFields();
  };

  const handleFieldChange = (changedValues) => {
    const fieldName = Object.keys(changedValues)[0];

    form.validateFields([fieldName]).catch(() => {});
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onValuesChange={handleFieldChange}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, whitespace: true, message: "Name is required" },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 8, message: "Minimum 8 characters" },
            ]}
          >
            <Input.Password placeholder="Create password" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Select a role" }]}
          >
            <Select
              placeholder="Select role"
              options={["Admin", "Developer", "Designer", "Manager"].map(
                (role) => ({ label: role, value: role })
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" block size="large">
        Create Account
      </Button>
    </Form>
  );
}

export default RegistrationForm;
