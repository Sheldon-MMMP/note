# git

### 用户信息

配置个人的用户名称和电子邮件地址：
```cmd
$ git config --global user.name "runoob" 
$ git config --global user.email test@runoob.com
```
如果用了 **--global** 选项，那么更改的配置文件就是位于你用户主目录下的那个，以后你所有的项目都会默认使用这里配置的用户信息。

如果要在某个特定的项目中使用其他名字或者电邮，只要去掉 --global 选项重新配置即可，新的设定保存在当前项目的 .git/config 文件里。
### 查看配置信息

要检查已有的配置信息，可以使用 git config --list 命令：
```cmd
$ git config --list
http.postbuffer=2M user.name=runoob
user.email=test@runoob.com
```
有时候会看到重复的变量名，那就说明它们来自不同的配置文件（比如 /etc/gitconfig 和 ~/.gitconfig），不过最终 Git 实际采用的是最后一个。

# Git 工作流程

本章节我们将为大家介绍 Git 的工作流程。

一般工作流程如下：

-   克隆 Git 资源作为工作目录。
-   在克隆的资源上添加或修改文件。
-   如果其他人修改了，你可以更新资源。
-   在提交前查看修改。
-   提交修改。
-   在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

下图展示了 Git 的工作流程：

![](https://www.runoob.com/wp-content/uploads/2015/02/git-process.png)