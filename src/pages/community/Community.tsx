
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "../../components/layout/MainLayout";
import { MessageSquare, Heart, UserPlus, Send, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timeAgo: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  likes: number;
  comments: Comment[];
  image?: string;
  timeAgo: string;
  isLiked?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image?: string;
}

const Community = () => {
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const users: User[] = [
    { id: "1", name: "Jane Smith", avatar: "", level: 12 },
    { id: "2", name: "John Doe", avatar: "", level: 8 },
    { id: "3", name: "Alex Johnson", avatar: "", level: 15 },
    { id: "4", name: "Maria Garcia", avatar: "", level: 10 },
    { id: "5", name: "Robert Chen", avatar: "", level: 7 }
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: users[0],
      content: "Just completed my daily meditation goal!",
      likes: 24,
      comments: [
        {
          id: "c1",
          userId: "2",
          userName: "John Doe",
          userAvatar: "",
          content: "That's awesome! Keep it up!",
          timeAgo: "1h ago"
        }
      ],
      timeAgo: "2h ago",
      isLiked: false
    },
    {
      id: "2",
      user: users[1],
      content: "My 30-day fitness challenge is going great! Anyone want to join me?",
      likes: 45,
      comments: [
        {
          id: "c2",
          userId: "3",
          userName: "Alex Johnson",
          userAvatar: "",
          content: "I'd love to join! What's involved?",
          timeAgo: "3h ago"
        }
      ],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500",
      timeAgo: "5h ago",
      isLiked: false
    },
    {
      id: "3",
      user: users[2],
      content: "Hit a new personal record today!",
      likes: 38,
      comments: [],
      timeAgo: "1d ago",
      isLiked: false
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Meditation Masters",
      description: "A group for meditation enthusiasts to share tips and experiences.",
      members: 128
    },
    {
      id: "2",
      name: "Fitness Fanatics",
      description: "Join us for daily workout challenges and nutrition tips.",
      members: 256
    }
  ]);

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikeStatus = !post.isLiked;
        return {
          ...post,
          likes: newLikeStatus ? post.likes + 1 : post.likes - 1,
          isLiked: newLikeStatus
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const addComment = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: "current-user",
      userName: "You",
      userAvatar: "",
      content: commentText,
      timeAgo: "Just now"
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({
      ...prev,
      [postId]: ""
    }));

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully."
    });
  };

  const createPost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty post",
        description: "Please add some content to your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      user: {
        id: "current-user",
        name: "You",
        avatar: "",
        level: 5
      },
      content: newPostContent,
      likes: 0,
      comments: [],
      timeAgo: "Just now",
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    
    toast({
      title: "Post created",
      description: "Your post has been published successfully."
    });
  };

  const createGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) {
      toast({
        title: "Incomplete information",
        description: "Please provide both a name and description for your group.",
        variant: "destructive"
      });
      return;
    }

    const newGroup: Group = {
      id: `g${Date.now()}`,
      name: newGroupName,
      description: newGroupDescription,
      members: 1
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupDescription("");
    setIsCreateGroupOpen(false);
    
    toast({
      title: "Group created",
      description: "Your group has been created successfully."
    });
  };

  return (
    <MainLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Community</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={createPost} className="w-full">Publish</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="feed">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
            <TabsTrigger value="friends" className="flex-1">Friends</TabsTrigger>
            <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            {posts.map(post => (
              <Card key={post.id} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.user.name}</p>
                            <p className="text-xs text-gray-500">Level {post.user.level}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback className="text-2xl">{post.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h3 className="font-semibold text-xl">{post.user.name}</h3>
                            <p className="text-sm text-muted-foreground">Level {post.user.level}</p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button className="flex gap-2">
                              <UserPlus className="h-4 w-4" /> Follow
                            </Button>
                            <Button variant="outline" className="flex gap-2">
                              <MessageSquare className="h-4 w-4" /> Message
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4 w-full mt-4">
                            <div className="text-center">
                              <p className="font-bold">128</p>
                              <p className="text-xs text-muted-foreground">Posts</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold">1.2k</p>
                              <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold">364</p>
                              <p className="text-xs text-muted-foreground">Following</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <span className="text-xs text-gray-500">{post.timeAgo}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mb-4">
                      <img src={post.image} alt="" className="w-full h-auto" />
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleLike(post.id)}
                      className={post.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} /> {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageSquare className="h-4 w-4" /> {post.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4" /> Share
                    </Button>
                  </div>
                </CardContent>
                {showComments[post.id] && (
                  <CardFooter className="flex flex-col space-y-3 pt-0">
                    <div className="w-full border-t my-2"></div>
                    
                    {post.comments.length > 0 && (
                      <div className="w-full space-y-3">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.userAvatar} />
                              <AvatarFallback>{comment.userName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-muted p-2 rounded-md">
                              <div className="flex justify-between items-center">
                                <p className="text-xs font-medium">{comment.userName}</p>
                                <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 w-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                      <Input 
                        placeholder="Write a comment..." 
                        value={commentInputs[post.id] || ''} 
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      />
                      <Button size="sm" onClick={() => addComment(post.id)}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="friends">
            <div className="grid gap-4 md:grid-cols-2">
              {users.map(user => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">Level {user.level}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-2xl">{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h3 className="font-semibold text-xl">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">Level {user.level}</p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button className="flex gap-2">
                              <UserPlus className="h-4 w-4" /> Follow
                            </Button>
                            <Button variant="outline" className="flex gap-2">
                              <MessageSquare className="h-4 w-4" /> Message
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4 w-full mt-4">
                            <div className="text-center">
                              <p className="font-bold">128</p>
                              <p className="text-xs text-muted-foreground">Posts</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold">1.2k</p>
                              <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold">364</p>
                              <p className="text-xs text-muted-foreground">Following</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Your Groups</h2>
              <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Group Name</label>
                      <Input 
                        placeholder="Enter group name" 
                        value={newGroupName} 
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea 
                        placeholder="What is this group about?" 
                        value={newGroupDescription} 
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                      />
                    </div>
                    <Button onClick={createGroup} className="w-full">Create Group</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {groups.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {groups.map(group => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      {group.image ? (
                        <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="h-12 w-12 text-white" />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{group.members} members</span>
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No groups yet. Create your first group!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Community;
