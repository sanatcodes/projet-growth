import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { PredictionAPIResponse, PredictionInput, VideoResponse, APIResponse } from '@/app/types/types';
import { fetchCategoryData, fetchCategoryPrediction, fetchWeekData, getPopularVideosByCategory, fetchWeekPrediction } from '@/pages/api/categoriesDetailAPI';

export const handlers = [
  rest.get<Record<string, string>, APIResponse[], void>('/category/:date', async (req: RestRequest<Record<string, string>, APIResponse[], void>, res: ResponseComposition<APIResponse[]>, ctx: RestContext) => {
    const { date } = req.params;
    const data: APIResponse[] = await fetchCategoryData(date);
    return res(ctx.json(data));
  }),

  rest.post<PredictionInput, PredictionAPIResponse, void>('/category/predict', async (req: RestRequest<PredictionInput, PredictionAPIResponse, void>, res: ResponseComposition<PredictionAPIResponse>, ctx: RestContext) => {
    const item: PredictionInput = req.body;
    const data: PredictionAPIResponse = await fetchCategoryPrediction(item);
    return res(ctx.json(data));
  }),

  rest.get<Record<string, string>, VideoResponse, void>('/popular/:categoryId', async (req: RestRequest<Record<string, string>, VideoResponse, void>, res: ResponseComposition<VideoResponse>, ctx: RestContext) => {
    const { categoryId } = req.params;
    const pageToken = req.url.searchParams.get('pageToken');
    const data: VideoResponse = await getPopularVideosByCategory(categoryId, pageToken);
    return res(ctx.json(data));
  }),

  rest.get<Record<string, string>, APIResponse[], void>('/week/:startDate', async (req: RestRequest<Record<string, string>, APIResponse[], void>, res: ResponseComposition<APIResponse[]>, ctx: RestContext) => {
    const { startDate } = req.params;
    const data: APIResponse[] = await fetchWeekData(startDate);
    return res(ctx.json(data));
  }),

  rest.post<{category_id: string, startDate: string, weeks: number}, PredictionAPIResponse[], void>('/week/predict', async (req: RestRequest<{category_id: string, startDate: string, weeks: number}, PredictionAPIResponse[], void>, res: ResponseComposition<PredictionAPIResponse[]>, ctx: RestContext) => {
    const { category_id, startDate, weeks } = req.body;
    const data: PredictionAPIResponse[] = await fetchWeekPrediction(category_id, startDate, weeks);
    return res(ctx.json(data));
  }),
];
