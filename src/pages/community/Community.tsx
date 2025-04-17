
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "../../components/layout/MainLayout";
import { MessageSquare, Heart, UserPlus, Send } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
}

interface Post {
  id: string;
  user: User;
  content: string;
  likes: number;
  comments: number;
  image?: string;
  timeAgo: string;
}

const Community = () => {
  const users: User[] = [
    { id: "1", name: "Jane Smith", avatar: "", level: 12 },
    { id: "2", name: "John Doe", avatar: "", level: 8 },
    { id: "3", name: "Alex Johnson", avatar: "", level: 15 },
    { id: "4", name: "Maria Garcia", avatar: "", level: 10 },
    { id: "5", name: "Robert Chen", avatar: "", level: 7 }
  ];

  const posts: Post[] = [
    {
      id: "1",
      user: users[0],
      content: "Just completed my daily meditation goal!",
      likes: 24,
      comments: 5,
      timeAgo: "2h ago"
    },
    {
      id: "2",
      user: users[1],
      content: "My 30-day fitness challenge is going great! Anyone want to join me?",
      likes: 45,
      comments: 12,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500",
      timeAgo: "5h ago"
    },
    {
      id: "3",
      user: users[2],
      content: "Hit a new personal record today!",
      likes: 38,
      comments: 8,
      timeAgo: "1d ago"
    }
  ];

  return (
    <MainLayout>
      <div className="p-4 max-w-3xl mx-auto">
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
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> {post.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <Send className="h-4 w-4" /> Share
                    </div>
                  </div>
                </CardContent>
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
            <div className="text-center py-10 text-muted-foreground">
              <p>No groups yet. Coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Community;
