# wtf表单
**安装**
```pip
pip install Flask-WTF
```
**配置**
```js
app.config[WTF_CSRF_SECRET_KEY='a random string'
```

**表单字段的常用核心参数**
- label：输入框前的文字描述，就是对这个字段进行描述。
- default：表单的默认值
- validators：表单验证规则
- widget：定制界面显示方式（如：文本框、复选框）
- description：帮助文字

#### WTForms支持的HTML标准字段

| 字段类型            | 说明                                |
| ------------------- | ----------------------------------- |
| BooleanField        | 复选框，值为True和False             |
| DateField           | 文本字段，值为datetime.date格式     |
| DareTimeField       | 文本字段，值为datetime.datetime格式 |
| FileField           | 文件上传字段                        |
| HiddenField         | 隐藏的文本字段                      |
| MultipleFileField   | 多文本上传字段                      |
| FieldList           | 一组指定类型的字段                  |
| FloatField          | 文本字段，值为浮点数                |
| FormField           | 把一个表单作为字段嵌入另一个表单    |
| IntegerField        | 文本字段，值为整数                  |
| PasswordField       | 密码文本字段                        |
| RadioField          | 一组单选按钮                        |
| SelectField         | 下拉列表                            |
| SelectMultipleField | 下拉列表，可选择多个值              |
| SubmitField         | 表单提交按钮                        |
| StringField         | 文本字段                            |
| TextAreaField       | 多行文本字段                        |
	
	
## WTForms验证函数

## 通过表单保存数据
步骤一：检查表单是否已经通过验证，我们面对一些特殊的表单时，必须要验证，如：昵称里必须要输入，密码的位数是否达到要求等，验证完后我们才能对数据进行保存。
```python
form.validate_on_submit()
```

步骤二：获取表单中传递过来的值,当我们通过验证后，我们就要获取表单中的数据了
```python
form.field_name.data
```

步骤三：业务逻辑代码编写（可结合ORM）