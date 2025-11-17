import { axiosInstance } from "./instance";
import type {
  MemberInfo,
  MemberInfoResponse,
  UpdateMemberRequest,
  UpdateMemberResponse,
  DeleteMemberResponse,
} from "../type/member";

// 회원 정보 조회
export const getMemberInfo = async (id: number): Promise<MemberInfo> => {
  const response = await axiosInstance.get<MemberInfoResponse>(`/users/${id}`);
  return response.data.data;
};

// 개인정보 수정
export const updateMemberInfo = async (
  id: number,
  request: UpdateMemberRequest
): Promise<MemberInfo> => {
  const response = await axiosInstance.patch<UpdateMemberResponse>(
    `/users/${id}`,
    request
  );
  return response.data.data;
};

// 회원탈퇴
export const deleteMember = async (
  id: number
): Promise<DeleteMemberResponse> => {
  const response = await axiosInstance.delete<DeleteMemberResponse>(
    `/users/${id}`
  );
  return response.data;
};
