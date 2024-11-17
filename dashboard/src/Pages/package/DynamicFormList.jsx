import { Form, Input, Button, Card } from "antd";

const DynamicFormList = ({ name, label, placeholder, rules }) => {
  return (
    <Card
    title={label}
    bordered={false}
    style={{ marginBottom: 16, background: '#f7f7f7' }} // Change background and margin as desired
    bodyStyle={{ padding: 16 }} // Add padding inside the card
  >
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name: fieldName, ...restField }) => (
            <Form.Item
              {...restField}
              key={key}
              name={fieldName}
              rules={rules}
            >
              <Input
                placeholder={placeholder}
                addonAfter={
                  <Button type="link" onClick={() => remove(fieldName)}>
                    Remove
                  </Button>
                }
              />
            </Form.Item>
          ))}
          <Button type="dashed" onClick={() => add()} block>
            Add {label}
          </Button>
        </>
      )}
    </Form.List>
    </Card>
  );
};

export default DynamicFormList;


