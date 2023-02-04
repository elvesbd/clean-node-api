import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockFakeSaveSurveyResultData } from '@/domain/test'
import { LoadSurveyResultRepositorySpy, SaveSurveyResultRepositorySpy } from '@/data/test'

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySpy: SaveSurveyResultRepositorySpy
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySpy = new SaveSurveyResultRepositorySpy()
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySpy, loadSurveyResultRepositorySpy)
  return {
    sut,
    saveSurveyResultRepositorySpy,
    loadSurveyResultRepositorySpy
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  const now = new Date()
  jest.useFakeTimers().setSystemTime(now)

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()

    const surveyResultData = mockFakeSaveSurveyResultData()
    await sut.save(surveyResultData)

    expect(saveSurveyResultRepositorySpy.saveSurveyResultParams).toEqual(surveyResultData)
  })

  it('should throws if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()

    jest.spyOn(saveSurveyResultRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockFakeSaveSurveyResultData())

    await expect(promise).rejects.toThrow()
  })

  it('should throws if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()

    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockFakeSaveSurveyResultData())

    await expect(promise).rejects.toThrow()
  })

  it('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()

    const surveyResultData = mockFakeSaveSurveyResultData()
    await sut.save(surveyResultData)

    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyResultData.surveyId)
  })

  it('should return SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()

    const surveyResult = await sut.save(mockFakeSaveSurveyResultData())

    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})
