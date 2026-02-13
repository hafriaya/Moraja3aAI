export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'student' | 'teacher' | null
          avatar_url: string | null
          grade_level: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'student' | 'teacher' | null
          avatar_url?: string | null
          grade_level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'student' | 'teacher' | null
          avatar_url?: string | null
          grade_level?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string | null
          type: 'info' | 'success' | 'warning' | 'error' | null
          read: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message?: string | null
          type?: 'info' | 'success' | 'warning' | 'error' | null
          read?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string | null
          type?: 'info' | 'success' | 'warning' | 'error' | null
          read?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      flashcard_sets: {
        Row: {
          id: string
          user_id: string
          exam_source_id: string | null
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exam_source_id?: string | null
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exam_source_id?: string | null
          title?: string
          created_at?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          id: string
          set_id: string
          front: string
          back: string
          is_mastered: boolean
        }
        Insert: {
          id?: string
          set_id: string
          front: string
          back: string
          is_mastered?: boolean
        }
        Update: {
          id?: string
          set_id?: string
          front?: string
          back?: string
          is_mastered?: boolean
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          id: string
          user_id: string
          title: string
          original_file_url: string | null
          processed_text_content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          original_file_url?: string | null
          processed_text_content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          original_file_url?: string | null
          processed_text_content?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      document_sections: {
        Row: {
          id: string
          material_id: string | null
          content_chunk: string
          embedding: string | null // Vector type is string in JSON rep usually or number[]? Supabase-js types usually treat it as string or number[]? It's usually string in generated types for vector.
        }
        Insert: {
          id?: string
          material_id?: string | null
          content_chunk: string
          embedding?: string | null
        }
        Update: {
          id?: string
          material_id?: string | null
          content_chunk?: string
          embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_sections_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          }
        ]
      }
      exams: {
        Row: {
          id: string
          user_id: string
          material_source_id: string | null
          title: string
          difficulty: 'Easy' | 'Medium' | 'Hard' | null
          status: 'generating' | 'ready' | 'completed' | null
          score: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          material_source_id?: string | null
          title: string
          difficulty?: 'Easy' | 'Medium' | 'Hard' | null
          status?: 'generating' | 'ready' | 'completed' | null
          score?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          material_source_id?: string | null
          title?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard' | null
          status?: 'generating' | 'ready' | 'completed' | null
          score?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_material_source_id_fkey"
            columns: ["material_source_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          id: string
          exam_id: string | null
          question_text: string
          options: Json | null
          correct_answer: string
          explanation: string | null
          order_index: number | null
        }
        Insert: {
          id?: string
          exam_id?: string | null
          question_text: string
          options?: Json | null
          correct_answer: string
          explanation?: string | null
          order_index?: number | null
        }
        Update: {
          id?: string
          exam_id?: string | null
          question_text?: string
          options?: Json | null
          correct_answer?: string
          explanation?: string | null
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
